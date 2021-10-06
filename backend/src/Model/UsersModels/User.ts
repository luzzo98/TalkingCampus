import {Schema, model} from 'mongoose'

export interface User {
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

const baseOptions = {
    discriminatorKey: 'role', // our discriminator key, could be anything
    collection: 'users', // the name of our collection
};

const baseSchema = new Schema<User>({
    email: { type: String, unique: true },
    psw: String,
    name: {type: String, required: false},
    surname: {type: String, required: false},
    picture: {data: Buffer, contentType: String, required: false}
}, baseOptions)

export const baseModel = model('base', baseSchema)

module.exports = baseModel.discriminator("teacher", baseSchema)
