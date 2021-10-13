import axios from "axios";
import * as utils from "../utils/utils"
import {User} from "../Model";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}/api/`;

class AuthService {
    login(email: string, psw: string) {
        console.log(email)
        console.log(psw)
        return axios
            .post(API_URL + "auth/signin", {
                email, psw
            })
            .then(response => {
                console.log(response.data)
                if (response.data.accessToken) {
                    console.log(JSON.stringify(response.data)) //TODO rimuovi stampa
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
            .then(response => {
                if (response.data.code) {
                    //TODO errore
                }
                console.log(response.data)
            });
    }

    registerProfessor(name: string, surname: string, phone_number: string, email: string, psw: string, corsi: any, ricevimento: any) {
        let profRes = axios
            .post(API_URL + "auth/signUpProfessor", {
                name, surname, phone_number, email, psw
            })
            .then(response => {
                //TODO cosa restituisce se è già registrato il prof?
                console.log(response.data)
            });
        return profRes
    }

    addcourse(course_id: string, teacher_id: string) {
        return axios
            .post(API_URL + "courses/addCourse", {
                course_id, teacher_id
            })
            .then(response => {
                if (response.data.code) {
                    //TODO errore
                }
                console.log(response.data)
            });
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('user') as string);
    }
}

export default new AuthService();
