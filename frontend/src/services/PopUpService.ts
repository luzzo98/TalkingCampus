import * as utils from "../utils/utils"
import * as lessonDeserializer from "../utils/LessonDeserializer";
import * as courseDeserializer from "../utils/CourseDeserializer";
import * as teacherDeserializer from "../utils/TeacherDeserializer";
import * as receptionDeserializer from "../utils/ReceptionDeserializer";
import {Course, Lesson, Reception, Room, Teacher} from "../Model";
import authHeader from "./AuthHeader";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

const header = authHeader();
header["Content-Type"] = 'application/json';

class PopUpService {

    handleAddingObs(room_name: string, email: string){
        fetch(API_URL + `/api/add-observed-room/${email}/${room_name}`, {
            headers: authHeader()
        }).then(res => console.log(res.json()));
        fetch(API_URL + `/api/add-observer/${room_name}/${email}`, {
            headers: authHeader()
        }).then(res => console.log(res.json()));
    }

    getLessons(room_id:string, onComplete: (lessons: Lesson[]) => void ){
        fetch(API_URL + `/api/lessons/${room_id}`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map(value => lessonDeserializer.mapToLesson(value)))
            .then(res => onComplete(res))
    }

    getCourse(course_id:string, onComplete: (course: Course) => void){
        fetch(API_URL + `/api/courses/${course_id}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => courseDeserializer.mapToCourse(value))[0])
            .then(c => onComplete(c))
    }

    getTeacher(email: string, onComplete: (teacher: Teacher) => void){
        fetch(API_URL + `/api/teachers/${email}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => teacherDeserializer.mapToTeacher(value))[0])
            .then(t => onComplete(t))
    }

    getReceptions(teacherEmail: string, onComplete: (receptions: Reception[]) => void){
        fetch(API_URL + `/api/receptions/${teacherEmail}`)
            .then((res: Response) => res.json())
            .then((json: JSON[]) => json.map(value => receptionDeserializer.mapToReception(value)))
            .then(receptions => onComplete(receptions))
    }

    deleteRoom(id: string){
        return fetch(API_URL + `/api/remove-room/${id}`)
            .then(response => response.ok)
    }

    addRoom(newRoom: Room){
        return fetch(API_URL + `/api/add-room`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newRoom)
        }).then(response => response.ok)
    }

    editRoom(update: any, id: string){
        return fetch(API_URL + `/api/edit-room/${id}`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(update)
        }).then(response => response.ok)
    }


}

export default new PopUpService()
