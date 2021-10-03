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

export interface RoomOnMap extends Room {
    isMarkerSet: boolean
}
