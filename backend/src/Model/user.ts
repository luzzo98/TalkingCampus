import {Schema, model} from 'mongoose'

interface User {
    email: string;
    role: string;
    psw: string;
    name?: string;
    surname?: string;
    badge_number?: string,
    phone_number?: string,
    university_name?: string
    picture?: string
}

const studentSchema = new Schema<User>({
    email: { type: String, unique: true },
    psw: String,
    role: "student",
    name: String,
    surname: String,
    badge_number: String,
    phone_number: String,
    university_name: String,
    picture: {data: Buffer, contentType: String}
})

const teacherSchema = new Schema<User>({
    email: { type: String, unique: true },
    psw: String,
    role: "teacher",
    name: String,
    surname: String,
    picture: {data: Buffer, contentType: String}
})

const adminSchema = new Schema<User>({
    email: "admin.admin@unibo.it",
    psw: "talkingCampusAdmin",
    role: "admin",
})

module.exports(model<User>('Student', studentSchema));
module.exports(model<User>('Teacher', teacherSchema));
