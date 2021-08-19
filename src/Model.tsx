import {DivIcon, LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    icon: DivIcon;
}

export interface markerDictionary {
    [id: string]: IMarker[]
}
