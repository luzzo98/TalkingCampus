import {DivIcon, LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    icon: DivIcon;
}

export interface MarkerDictionary {
    [id: string]: IMarker[]
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
    room_name: string,
    occupied_seats: number,
    total_seats: number,
    lesson_name: string,
    start: string,
    end: string
    teacher: string
}
