import {Course} from "../Model";

export function mapToCourse(jsonElement: any): Course{
    return {
        course_id: jsonElement.course_id,
        teacher_id: jsonElement.teacher_id
    };
}
