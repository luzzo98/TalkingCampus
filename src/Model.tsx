import {DivIcon, LatLngTuple} from "leaflet";

export interface IMarker {
    position: LatLngTuple;
    icon: DivIcon;
}

export interface MarkerDictionary {
    [id: string]: IMarker[]
}
