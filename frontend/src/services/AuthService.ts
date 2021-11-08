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
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    registerStudent(name: string, surname: string, phone_number: string, university_name: string, badge_number: string, email: string, psw: string, picture: string) {
        return axios
            .post(API_URL + "auth/signUpStudent", {
                name, surname, phone_number, university_name, badge_number, email, psw, picture
            })
    }

    registerProfessor(name: string, surname: string, phone_number: string, email: string, psw: string, picture: string) {
        return axios
            .post(API_URL + "auth/signUpProfessor", {
                name, surname, phone_number, email, psw, picture
            })
    }
}

export default new AuthService();
