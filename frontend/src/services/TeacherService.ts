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
            {headers: authHeader()})
    }

    getCourses(teacher_id: string) {
        return axios.get(API_URL + `all-courses/${teacher_id}`, {headers: authHeader()})
    }

    addCourse(course_id: string, teacher_id: string) {
        return axios
            .post(API_URL + "courses/addCourse", {
                course_id, teacher_id
            }, { headers: authHeader()})
    }

    deleteCourse(teacher_id: string, course_id: string) {
        return axios.get(API_URL + `del-course/${teacher_id}&${course_id}`, {headers: authHeader()})
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

    getLessonsFromCourse(course_id: string) {
        return axios.get(API_URL + `get-lessons/${course_id}`)
    }

    deleteLessons(id: string, course_name: string, room: string, day: string, start: { hours: string, minutes: string }, end: { hours: string, minutes: string }) {
        return axios.get(API_URL + `del-lesson/${id}&${course_name}&${room}&${day}&${start.hours}&${start.minutes}&${end.hours}&${end.minutes}`, {headers: authHeader()})
    }

    deleteAllLessons(id: string, course_name: string) {
        return axios.get(API_URL + `del-all-lessons/${id}&${course_name}`, {headers: authHeader()})
    }

    getLessonsRooms() {
        return axios.get(API_URL + "lessons-rooms")
    }
}

export default new TeacherService();