import axios from "axios";
import {User} from "../Model";

const API_URL = "http://localhost:80/api/auth/"; //todo add /auth/signin in backend

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
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

    registerStudent(nome: string, cognome: string, telefono: string, universita: string, matricola: string, email: string, password: string) {
        return axios
            .post(API_URL + "signup", {
                nome, cognome, telefono, universita, matricola, email, password
            })
            .then(response => {
                //TODO cosa restituisce se è già registrato lo studente?
            });
    }

    registerProfessor(nome: string, cognome: string, telefono: string, email: string, password: string, corsi: any, ricevimento: any) {
        return axios
            .post(API_URL + "signup", {
                nome, cognome, telefono, email, password, corsi, ricevimento
            })
            .then(response => {
                //TODO cosa restituisce se è già registrato il prof?
            });
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('user') as string);
    }
}

export default new AuthService();