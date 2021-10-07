import React, {useEffect, useState} from "react";
import {ModalTitle} from "react-bootstrap";
import {Course, Lesson, Room, Teacher} from "../Model";
import {Popup} from "react-leaflet";
import {Button, Calendar, List, Modal, Table} from "antd";
import * as utils from "../utils/utils"
import * as lessonDeserializer from "../utils/LessonDeserializer";
import * as courseDeserializer from "../utils/CourseDeserializer";
import * as teacherDeserializer from "../utils/TeacherDeserializer";
require("../styles/pop_up/popUpStyle.scss")

interface Props {
    room: Room,
    offset: [number, number]
}

function handleClick(){
    console.log("aggiungere la mail dell'utente che accede qua alla lista degl'osservatori")
}

const DefaultPopUp: React.FC<Props> = (props:Props) => {

    const [isTeacherHidden, setIsTeacherHidden] = useState(true);

    function getLessons(room_id:string){
        fetch(`http://localhost:80/api/lessons/${room_id}`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map(value => lessonDeserializer.mapToLesson(value)))
            .then(res => setLessons(res))
    }

    function getCourse(course_id:string){
        return fetch(`http://localhost:80/api/courses/${course_id}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => courseDeserializer.mapToCourse(value))[0])
            .then(c => setCourses(prevState =>
                prevState.find(course => course.course_id === c.course_id) ? prevState : prevState.concat(c)))
    }

    function getTeacher(email:string){
        return fetch(`http://localhost:80/api/teachers/${email}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => teacherDeserializer.mapToTeacher(value))[0])
            .then(t => {
                setTeachers(prevState =>
                    prevState.find(teacher => t.email === teacher.email) ? prevState : prevState.concat(t))
            })
    }

    function getReception(teacherEmail:string){
        return fetch(`http://localhost:80/api/receptions/${teacherEmail}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => receptionDeserializer.mapToReception(value)))
    }

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    useEffect(() => {
        getLessons(props.room.name);
    },[]);

    useEffect(() =>
        lessons.forEach(l => getCourse(l.course_name)),[lessons])

    useEffect(() => {
        courses.forEach(c => getTeacher(c.teacher_id))
    },[courses])

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

        const lesson: Lesson = lessons
            .filter(l => (l.start.hours <= currentHour && l.end.hours > currentHour) && l.day === day)[0]
        return lesson
    }

    function getLessonSection(){
        const lesson = getRealTimeLesson();
        const teacher = teachers.find(t => t.email === courses.find(c => lesson?.course_name === c.course_id)?.teacher_id);
        return lesson ? <div className={"classroom-infos " + (isTeacherHidden ? "" : "margin-bottom")}>
            <h3>Lezione in Corso:</h3>
            <p>{lesson.course_name} {utils.getCorrectFormat(lesson.start)}/{utils.getCorrectFormat(lesson.end)}</p>
            <p><a onClick={() =>
                setIsTeacherHidden(prevState => !prevState)}>
                Docente: {teacher?.name} {teacher?.surname}</a></p>
            <div className={isTeacherHidden ? "sub-info-hidden" : "sub-info-visible"}>
                <p>email: {teacher?.email}<br/>telefono: {teacher?.phone_number}</p>
                {/*<p>Ricevimento:<br/>Lun 10:00/11:00<br/>Gio 14:30/16:00</p>*/}
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
                        </div>
                        :null}
                </div> : null
            }
            {props.room.maximum_seats > 0 ?
                <p>Posti occupati: {props.room.occupied_seats}/{props.room.maximum_seats}</p> : null}
                <div className={"class-buttons"}>
                    {props.room.type === "Aula" ?
                        <Button className={"prenote-class"}
                                onClick={() => setModalVisible(true)}>Lezioni in programma</Button> : null}
                    <Button className={"prenote-class"} onClick={handleClick}>Osserva Locale</Button>
                </div>
        </Popup>
    );
}

export default DefaultPopUp;
