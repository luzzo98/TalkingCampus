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
