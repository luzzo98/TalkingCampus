import React, {useEffect, useState} from "react";
import {ModalTitle} from "react-bootstrap";
import {Course, Lesson, Reception, Room, Teacher} from "../Model";
import {Popup} from "react-leaflet";
import {Button, List, Modal} from "antd";
import * as utils from "../utils/utils"
import {getCorrectFormat} from "../utils/utils";
import DefaultPopUpService from "../services/PopUpService";
require("../styles/pop_up/popUpStyle.scss")

interface Props {
    room: Room,
    offset: [number, number]
}

const io = require("socket.io-client");
const socket = io(`${utils.BASE_URL}${utils.SOCKET_IO_PORT}`);

const DefaultPopUp: React.FC<Props> = (props:Props) => {

    function handleAddingObs(room_name: string, email: string){
        DefaultPopUpService.handleAddingObs(room_name, email)
    }

    function getLessons(room_id:string){
        DefaultPopUpService.getLessons(room_id, lesson => setLessons(lesson))
    }

    function getCourse(course_id:string){
        DefaultPopUpService.getCourse(course_id, c =>
            setCourses(prevState =>
                prevState.find(course => course.course_id === c.course_id) ? prevState : prevState.concat(c)
            ))
    }

    function getTeacher(email: string){
        DefaultPopUpService.getTeacher(email, t => setTeachers(
            prevState => prevState.find(teacher => t.email === teacher.email) ? prevState : prevState.concat(t)))
    }

    function getReceptions(teacherEmail: string){
        DefaultPopUpService.getReceptions(teacherEmail, receptions => setReceptions(receptions))
    }

    const [occupiedSeats, setOccupiedSeats] = useState(props.room.occupied_seats)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [receptions, setReceptions] = useState<Reception[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [isTeacherHidden, setIsTeacherHidden] = useState(true);

    useEffect(() => {
        getLessons(props.room.name);
        socket.on("update-seats: " + props.room.name, (seats: number) => {
            setOccupiedSeats(seats)
        })
    },[]);

    useEffect(() =>
        lessons.forEach(l => getCourse(l.course_name)),[lessons])

    useEffect(() => {
        courses.forEach(c => getTeacher(c.teacher_id))
    },[courses])

    useEffect(() => {
        teachers.forEach(t => getReceptions(t.email))
    },[teachers])

    const phone = props.room.adding_info
                                       && props.room.adding_info.phone_number ? props.room.adding_info.phone_number : ""
    const opening = props.room.adding_info
                                       && props.room.adding_info.opening_hour ? props.room.adding_info.opening_hour : null
    const closing = props.room.adding_info
                                       && props.room.adding_info.closing_hour ? props.room.adding_info.closing_hour : null
    const notes = props.room.adding_info
                                       && props.room.adding_info.notes ? props.room.adding_info.notes : null

    function timeToString(time: any): string[] {
        let timeString: string[] = [];
        if (time) {
            const hour:string = time.hours < 10 ? "0" + time.hours : "" + time.hours
            const minutes:string = time.minutes < 10 ? "0" + time.minutes : "" + time.minutes
            timeString = [hour, minutes]
        }
        return timeString;
    }

    function getRealTimeLesson(){
        const currentHour = new Date().getHours();
        const day = utils.convertDay(new Date().getDay())

        return lessons.filter(l => (l.start.hours <= currentHour && l.end.hours > currentHour) && l.day === day)[0]
    }

    function getLessonSection(){
        const lesson = getRealTimeLesson();
        const teacher = teachers.find(t => t.email === courses.find(c => lesson?.course_name === c.course_id)?.teacher_id)
        return lesson ? <div className={"classroom-infos " + (isTeacherHidden ? "" : "margin-bottom")}>
            <h3>Lezione in Corso:</h3>
            <p>{lesson.course_name} {utils.getCorrectFormat(lesson.start)}/{utils.getCorrectFormat(lesson.end)}</p>
            <p><a onClick={() =>
                setIsTeacherHidden(prevState => !prevState)}>
                Docente: {teacher?.name} {teacher?.surname}</a></p>
            <div className={isTeacherHidden ? "sub-info-hidden" : "sub-info-visible"}>
                <p>Email: {teacher?.email}<br/>Telefono: {teacher?.phone_number}</p>
                <div className={"receptions"}>
                    <p>Ricevimento:</p>
                    {receptions.filter(r => r.teacher_email === teacher?.email)
                        .map(e => <p>{e.day} {getCorrectFormat(e.start)}/{getCorrectFormat(e.end)}</p>)}
                </div>
            </div>
        </div>:null
    }

    function lessonsToMap(){
        const map: Map<string, Lesson[]> = new Map()
        lessons.sort((l1, l2) => utils.reverseDay(l1.day) - utils.reverseDay(l2.day))
               .forEach(l => map.has(l.day) ? map.get(l.day)?.push(l) : map.set(l.day, [l]))
        return Array.from(map, ([k, v]) => ({
            day: k,
            less: v
        }));
    }

    function findTeacher(course_name: string): Teacher|undefined{
        return teachers.find(t => t.email === courses.find(c => c.course_id === course_name)?.teacher_id)
    }

    let openingToString:string[] = timeToString(opening)
    let closingToString:string[] = timeToString(closing)

    function renderReceptions(receptions: Reception[]): JSX.Element[]{
        return receptions.map(
            e => <p>Ricevimento: {e.day} {getCorrectFormat(e.start)}/{getCorrectFormat(e.end)}</p>
        );
    }

    return (
        <Popup offset={props.offset}>
            <ModalTitle> {props.room.name} </ModalTitle>
            <hr/>
            {props.room.type === "Aula" ? getLessonSection() : null}
            <Modal
                title="Calendario"
                style={{ top: 20 }}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <List className={"first-list"}
                    header={<h2>Lezioni in programma</h2>}
                    bordered
                    dataSource={lessonsToMap()}
                    renderItem={item => (
                        <List
                            header={<h3>{item.day}</h3>}
                            bordered
                            dataSource={item.less.sort(
                                (l1, l2) => l1.start.hours - l2.start.hours
                            )}
                            renderItem={less =>(
                                <List.Item>
                                    Corso: {less.course_name}<br/>
                                    {less.room}<br/>
                                    Orario: {utils.getCorrectFormat(less.start)+"/"+utils.getCorrectFormat(less.end)}<br/>
                                    Professore: {findTeacher(less.course_name)?.name + " " + findTeacher(less.course_name)?.surname}
                                </List.Item>
                            )}
                            pagination= {{
                                pageSize: 1,
                                simple: true
                            }}
                        >
                        </List>
                    )}
                />
            </Modal>
            {props.room.adding_info ?
                <div>
                    {phone !== "" ? <p>Telefono: {phone}</p>:null}
                    {openingToString.length !== 0 ?
                        <p>Apertura ore: {openingToString[0]}:{openingToString[1]}</p>:null}
                    {closingToString.length !== 0 ?
                        <p>Chiusura ore: {closingToString[0]}:{closingToString[1]}</p>:null}
                    {notes ?
                        <div className={"notes"}>
                            <h3>{notes.title}</h3>
                            <p>{notes.content}</p>
                        </div> : null}
                </div> : null
            }
            {props.room.maximum_seats > 0 ?
                <p>Posti occupati: {occupiedSeats}/{props.room.maximum_seats}</p> : null}
                <div className={"class-buttons"}>
                    {props.room.type === "Aula" ?
                        <Button className={"prenote-class"}
                                onClick={() => setModalVisible(true)}>Lezioni in programma</Button> : null}
                    <Button className={"prenote-class"} onClick={() =>
                        handleAddingObs(props.room.name, "christian.derrico@studio.unibo.it")}>Osserva Locale</Button>
                </div>
        </Popup>
    );
}

export default DefaultPopUp;
