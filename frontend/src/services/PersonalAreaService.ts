import * as utils from "../utils/utils"
import {Student, Teacher} from "../Model";
import * as userDeserializer from "../utils/UserDeserializer";
import authHeader from "./AuthHeader";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

class PersonalAreaService {

    findStudent(email: string, onComplete: (student: Student) => void){
        fetch(API_URL + `/api/student/${email}`,{
            headers: authHeader()
        })
            .then(res => res.json())
            .then((json:JSON) => userDeserializer.mapToStudent(json))
            .then(s => onComplete(s))
    }

    findTeacher(email: string, onComplete: (teacher: Teacher) => void){
        fetch(API_URL + `/api/teachers/${email}`,{
            headers: authHeader()
        })
            .then(res => res.json())
            .then((json:JSON) => userDeserializer.mapToTeacher(json))
            .then(s => onComplete(s))
    }
}

export default new PersonalAreaService()
