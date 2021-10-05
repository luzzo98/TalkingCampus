import {model, Schema} from "mongoose";

interface Lesson {
    course_name: string,
    room: string,
    day: string,
    start: {
        hours:number,
        minutes:number
    },
    end: {
        hours:number,
        minutes:number
    }
}

const days:string[] = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]

const lessonSchema = new Schema<Lesson>({
    course_name: String,
    room: String,
    day: {type: String, enum: days},
    start: {
        hours:{type: Number, required:true},
        minutes:{type: Number, required:true}
    },
    end: {
        hours:{type: Number, required:true},
        minutes:{type: Number, required:true}
    }
});

module.exports = model<Lesson>("Lesson", lessonSchema);
