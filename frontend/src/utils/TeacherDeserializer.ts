import {Teacher} from "../Model";

export function mapToTeacher(jsonElement: any): Teacher{
    return {
        email: jsonElement.email,
        name: jsonElement.name,
        psw: jsonElement.psw,
        surname: jsonElement.surname
    };
}
