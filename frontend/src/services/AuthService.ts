import axios from "axios";
import * as utils from "../utils/utils"

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}/api/`;

class AuthService {
    login(email: string, psw: string) {
        return axios
            .post(API_URL + "auth/signin", {
                email, psw
            })
            .then(response => {
                console.log("res.data",response.data) //TODO cancella log
                if (response.data.accessToken) {
                    console.log("TOKEN E INFO SALVATE", JSON.stringify(response.data)) //TODO rimuovi stampa
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    registerStudent(name: string, surname: string, phone_number: string, university_name: string, badge_number: string, email: string, psw: string) {
        return axios
            .post(API_URL + "auth/signUpStudent", {
                name, surname, phone_number, university_name, badge_number, email, psw
            })
    }

    registerProfessor(name: string, surname: string, phone_number: string, email: string, psw: string) {
        return axios
            .post(API_URL + "auth/signUpProfessor", {
                name, surname, phone_number, email, psw
            })
    }

    addCourse(course_id: string, teacher_id: string) {
        return axios
            .post(API_URL + "courses/addCourse", {
                course_id, teacher_id
            })
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
}

export default new AuthService();
