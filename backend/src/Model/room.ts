import {Schema} from "mongoose";

enum Type {
    Bath,
    ClassRoom,
    Laboratory,
    Cafeteria,
    Office,
    Study_Room
}

interface Room {
    type: Type,
    maximum_seats: number,
    occupied_seats: number,
    name: string,
    position: [number, number]
    observers?: string[],
    adding_info?: {
        phone_number?: string
        opening_hour?: {
            hour: number,
            minutes: number
        }
        closing_hour?: {
            hour: number,
            minutes: number
        }
    }
}

/*const roomSchema = new Schema<Room>({
    type: Type,
    maximum_seats: Number,
    occupied_seats: {Number, default: 0},
    name: String,
    position: [Number, Number],
    observers:
})*/

