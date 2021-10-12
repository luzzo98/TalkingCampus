import {Schema, model} from 'mongoose'

export interface User {
    email: string;
    role: string;
    psw: string;
    name?: string;
    surname?: string;
    badge_number?: string,
    phone_number?: string,
    university_name?: string,
    observed_rooms?: string[],
    picture?: string
}

const baseOptions = {
    discriminatorKey: 'role', // our discriminator key, could be anything
    collection: 'users', // the name of our collection
};

const baseSchema = new Schema<User>({
    email: { type: String, unique: true },
    psw: String,
    phone_number: String,
    name: {type: String, required: false},
    surname: {type: String, required: false},
    picture: {data: Buffer, contentType: String, required: false}
}, baseOptions)

const studentSchema = new Schema<User>({
    badge_number: String,
    university_name: String,
    observed_rooms: {type: [String], default: []},
})

const baseModel = model('base', baseSchema)

exports.user = baseModel

exports.teacher = baseModel.discriminator("teacher", baseSchema)

exports.student = baseModel.discriminator('student', studentSchema)

