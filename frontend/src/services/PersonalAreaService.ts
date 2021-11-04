import * as utils from "../utils/utils"
import * as roomDeserializer from "../utils/RoomDeserializer";
import {RoomOnMap, Student} from "../Model";
import * as userDeserializer from "../utils/UserDeserializer";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

class PersonalAreaService {

    findStudent(email: string, onComplete: (student: Student) => void){
        fetch(API_URL + `/api/students/${email}`)
            .then(res => res.json())
            .then((json:JSON) => userDeserializer.mapToStudent(json))
            .then(s => onComplete(s))
    }

}

export default new PersonalAreaService()
