import {model, Schema} from "mongoose";

interface Course {
    course_id: string,
    teacher_id: string
}

const courseSchema = new Schema<Course>({
    course_id: {type: String, unique: true},
    teacher_id: String
});

module.exports = model<Course>("Course", courseSchema);
