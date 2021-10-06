import React, {useEffect, useState} from "react";
import {ModalTitle} from "react-bootstrap";
import {Course, Lesson, Room, Teacher} from "../Model";
import {Popup} from "react-leaflet";
import {Button} from "antd";
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
            .then(t => setTeachers(prevState =>
                prevState.find(t => t.email === t.email) ? prevState : prevState.concat(t)))
    }

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [teachers, setTeachers] = useState<Teacher[]>([])

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

    function timeToString(time: any): string[] {
        let timeString: string[] = [];
        if (time) {
            const hour:string = time.hours < 10 ? "0" + time.hours : "" + time.hours
            const minutes:string = time.minutes < 10 ? "0" + time.minutes : "" + time.minutes
            timeString = [hour, minutes]
        }
        return timeString;
    }

    function getSingleFormat(value: number){
        return value < 10 ? "0" + value : "" + value
    }

    function getCorrectFormat(value: {hours: number, minutes: number}): string {
        return getSingleFormat(value.hours) + ":" + getSingleFormat(value.minutes)
    }

    function getRealTimeLesson(){
        const currentHour = new Date().getHours();
        const lesson: Lesson = lessons.filter(l => l.start.hours <= currentHour && l.end.hours > currentHour)[0]
        return lesson
    }

    function getLessonSection(){
        const lesson = getRealTimeLesson();
        return lesson ? <div className={"classroom-infos " + (isTeacherHidden ? "" : "margin-bottom")}>
            <h3>Lezione in Corso:</h3>
            <p>{lesson.course_name} {getCorrectFormat(lesson.start)}/{getCorrectFormat(lesson.end)}</p>
            <p><a onClick={() => setIsTeacherHidden(prevState => !prevState)}>Docente: xxx</a></p>
            <div className={isTeacherHidden ? "sub-info-hidden" : "sub-info-visible"}>
                <p>vittorio.ghini@email.com<br/>tel:3328934523</p>
                <p>Ricevimento:<br/>Lun 10:00/11:00<br/>Gio 14:30/16:00</p>
            </div>
        </div>:null
    }

    let openingToString:string[] = timeToString(opening)
    let closingToString:string[] = timeToString(closing)

    return (
        <Popup offset={props.offset}>
            <ModalTitle> {props.room.name} </ModalTitle>
            <hr/>
            {props.room.type === "Aula" ? getLessonSection() : null}
            <p>Posti occupati: {props.room.occupied_seats}/{props.room.maximum_seats}</p>
            {props.room.adding_info ?
                <div>
                    {phone !== "" ? <p>Telefono: {phone}</p>:null}
                    {openingToString.length !== 0 ?
                        <p>- Apertura ore: {openingToString[0]}:{openingToString[1]}</p>:null}
                    {closingToString.length !== 0 ?
                        <p>- Chiusura ore: {closingToString[0]}:{closingToString[1]}</p>:null}
                </div> : null
            }
            {props.room.type === "Aula" ?
                <Button className={"prenote-class"} onClick={handleClick}>Prenota Aula</Button> : null}
        </Popup>
    );
}

export default DefaultPopUp;
