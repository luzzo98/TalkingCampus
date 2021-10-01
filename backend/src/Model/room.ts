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
    }
}

const roomSchema = new Schema<Room>({
    type: String,
    maximum_seats: Number,
    occupied_seats: {type: Number, default: 0},
    name: String,
    floor: Number,
    position: [Number, Number],
    observers: {type: [{String}], default: []},
    adding_info: {
        phone_number: {type: String, default: ""},
        opening_hour: {
            hours: Number,
            minutes: Number
        },
        closing_hour: {
            hours: Number,
            minutes: Number
        }
    }
});

module.exports = model<Room>("Rooms", roomSchema);
