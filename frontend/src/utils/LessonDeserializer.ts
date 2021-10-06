import {Lesson} from "../Model";

export function mapToLesson(jsonElement: any): Lesson{
    return {
        course_name: jsonElement.course_name,
        day: jsonElement.day,
        room: jsonElement.room,
        start: {
            hours: jsonElement.start.hours,
            minutes: jsonElement.start.minutes
        },
        end: {
            hours: jsonElement.end.hours,
            minutes: jsonElement.end.minutes
        }
    };
}
