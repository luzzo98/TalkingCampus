import {Reception} from "../Model";

export function mapToReception(jsonElement: any): Reception{
    return {
        teacher_email: jsonElement.teacher_email,
        day: jsonElement.day,
        start: jsonElement.start,
        end: jsonElement.end,
    };
}
