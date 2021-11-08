import axios from "axios";
import * as utils from "../utils/utils"
import authHeader from "./AuthHeader";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}/api/`;

class TeacherService {
    getReceptions(teacherEmail: string) {
        return axios.get(API_URL + `receptions/${teacherEmail}`)
    }

    addReception(teacher_email: string, day: string, start: string, end: string) {
        return axios
            .post(API_URL + "receptions/addReception", {
                teacher_email,
                day,
                start: {
                    hours: start.substr(0, start.indexOf(':')),
                    minutes: start.substr(start.indexOf(':')+1, start.length)
                },
                end: {
                    hours: end.substr(0, end.indexOf(':')),
                    minutes: end.substr(end.indexOf(':')+1, start.length)
                }
            })
    }

    deleteReception(email: string, day: string, start: any, end: any) {
        return axios.get(API_URL + `del-receptions/${email}&${day}&${start.hours}&${start.minutes}&${end.hours}&${end.minutes}`,
            { headers: authHeader()})
    }

    addCourse(course_id: string, teacher_id: string) {
        return axios
            .post(API_URL + "courses/addCourse", {
                course_id, teacher_id
            }, { headers: authHeader()})
    }

    addLesson(course_name: string, room: string, day: string, start: string, end: string) {
        return axios
            .post(API_URL + "lessons/addLesson", {
                course_name,
                room,
                day,
                start: {
                    hours: start.substr(0, start.indexOf(':')),
                    minutes: start.substr(start.indexOf(':')+1, start.length)
                },
                end: {
                    hours: end.substr(0, end.indexOf(':')),
                    minutes: end.substr(end.indexOf(':')+1, start.length)
                }
            })
    }

    getLessonsRooms() {
        return axios.get(API_URL + "lessons-rooms")
    }
}

export default new TeacherService();