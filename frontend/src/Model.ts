import {DivIcon, LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    type: string;
    isMarkerSet: boolean;
    id: string
}

/*export interface MarkerDictionary {
    [id: string]: IMarker[]
}*/

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
    maximum_seats: number,
    occupied_seats: number,
    name: string,
    floor: number,
    position: [number, number],
    observers: string[],
    phone_number?: string,
    opening_hour?: [number, number],
    closing_hour?: [number, number]
}

export interface RoomOnMap extends Room {
    isMarkerSet: boolean
}
