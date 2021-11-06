import {Student, Teacher} from "../Model";

const translation = new Map<string, string>([
        ["name", "Nome"],
        ["surname", "Cognome"],
        ["email", "Email"],
        ["phone number", "Numero di telefono"],
        ["badge number", "Numero di matricola"],
        ["university name", "Università"]
    ])

function mapToUser(jsonElement: JSON){
    const excludeFields = ["_id", "__v", "psw", "role", "observed_rooms", "picture"]
    const columns = Array.from(translation.values())
    return Object.assign({}, Object.entries(jsonElement)
                 .filter(e => !excludeFields.includes(e[0]))
                 .map(([k, v]) => [translation.get(k.replace("_", " ")) as string, v])
                 .sort(([k1 , v1], [k2, v2]) =>
                     columns.indexOf(k1) - columns.indexOf(k2)
                 ).reduce((a, [k, v]) => ({ ...a, [k]: v}), {})
    )
}

export function mapToTeacher(jsonElement: any): Teacher { return mapToUser(jsonElement) as Teacher }

export function mapToStudent(jsonElement: any): Student { return mapToUser(jsonElement) as Student }
