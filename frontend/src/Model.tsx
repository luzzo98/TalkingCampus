import {DivIcon, LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    type: string;
    isMarkerSet: boolean;
    id: string
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
    type: string,
    occupied_seats: number,
    total_seats: number,
    lesson_name?: string,
    start?: string,
    end?: string
    teacher?: string
}