import {model, Schema} from "mongoose";

interface Room {
    type: string,
    maximum_seats: number,
    occupied_seats: number,
    name: string,
    floor: number,
    position: [number, number]
    observers?: string[],
    adding_info?: {
        phone_number?: string
        opening_hour?: {
            hours: number,
            minutes: number
        }
        closing_hour?: {
            hours: number,
            minutes: number
        }
        notes?: {
            title: string,
            content: string
        }
    }
}

const roomSchema = new Schema<Room>({
    type: String,
    maximum_seats: Number,
    occupied_seats: {type: Number, default: 0},
    name: {type: String, unique: true},
    floor: Number,
    position: [Number, Number],
    observers: {type: [{String}], default: []},
    adding_info: {
        required: false,
        phone_number: {type: String},
        opening_hour: {
            hours: Number,
            minutes: Number
        },
        closing_hour: {
            hours: Number,
            minutes: Number
        },
        notes: {
            title: String,
            content: String
        }
    }
});

module.exports = model<Room>("Room", roomSchema);
