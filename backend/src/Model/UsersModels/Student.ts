import {model, Schema} from "mongoose";
import {baseModel, User} from "./User";

const studentSchema = new Schema<User>({
    badge_number: String,
    phone_number: String,
    university_name: String
})

module.exports = baseModel.discriminator('student', studentSchema)
