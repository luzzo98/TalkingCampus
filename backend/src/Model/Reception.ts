import {model, Schema} from "mongoose";

interface Reception {
    teacher_email: string,
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

const lessonSchema = new Schema<Reception>({
    teacher_email: String,
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

module.exports = model<Reception>("Reception", lessonSchema);
