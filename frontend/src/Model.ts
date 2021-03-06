import {LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    type: string;
    isMarkerSet: boolean;
    id: string
}

export interface User {
    id: number;
    name: string;
    img: string;
    role: string;
}

export interface MainpageContents {
    user: User
    hooks: [string, string][];
}

export interface Room {
    id?: string,
    type: string,
    maximum_seats: number,
    occupied_seats: number,
    name: string,
    floor: number,
    position: [number, number],
    adding_info?: {
        phone_number?: string
        opening_hour?: {
            hours: number,
            minutes: number
        },
        closing_hour?: {
            hours: number,
            minutes: number
        },
        notes?:{
            title: string,
            content: string
        }
    }
}

export interface RoomOnMap extends Room {
    isMarkerSet: boolean
}

export interface Lesson {
    course_name: string,
    room: string,
    day: string,
    start: {
        hours: number,
        minutes: number
    },
    end: {
        hours: number,
        minutes: number
    }
}

export interface Course {
    course_id: string,
    teacher_id: string
}

export interface Reception {
    teacher_email: string,
    day: string,
    start: {
        hours: number,
        minutes: number
    },
    end: {
        hours: number,
        minutes: number
    }
}

export interface Teacher {
    email: string,
    phone_number: string,
    psw: string
    name: string,
    surname: string,
    picture?: any
}

export interface Student extends Teacher {
    observed_rooms: string[],
    badge_number: string,
    university_name: string
}

export interface ListItem {
    id: string
    content: string
}
