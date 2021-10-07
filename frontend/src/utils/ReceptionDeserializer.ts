import {Course} from "../Model";

export function mapToReception(jsonElement: any): Reception{
    return {
        course_id: jsonElement.course_id,
        teacher_id: jsonElement.teacher_id
    };
}
