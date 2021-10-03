import {IMarker, RoomOnMap, User} from "../Model";
import {renderToStaticMarkup} from "react-dom/server";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBook,
    faChalkboardTeacher,
    faBath,
    faCoffee,
    faFax,
    faFlask,
} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {divIcon, LatLngTuple} from "leaflet";
import * as React from "react";

export const locals: Map<string,IconDefinition> = new Map<string, IconDefinition>([
    ["Aula_Studio", faBook],
    ["Laboratorio", faFlask],
    ["Bagno", faBath],
    ["Segreteria", faFax],
    ["Mensa", faCoffee],
    ["Aula", faChalkboardTeacher]
])

export const reducer = (prevState: any, updatedProperty:any) => ({
    ...prevState,
    ...updatedProperty,
});

export function mapToRoom(jsonElement: any): RoomOnMap{
    return {
        id: jsonElement._id,
        type: jsonElement.type,
        maximum_seats: jsonElement.maximum_seats,
        occupied_seats: jsonElement.occupied_seats,
        name: jsonElement.name,
        floor: jsonElement.floor,
        position: jsonElement.position,
        observers: jsonElement.observers,
        adding_info: !jsonElement.adding_info ? {}
                   : { phone_number: !jsonElement.adding_info.phone_number ? "" : jsonElement.adding_info.phone_number,
                       opening_hour: !jsonElement.adding_info.opening_hour ? [null, null] : jsonElement.adding_info.opening_hour,
                       closing_hour: !jsonElement.adding_info.closing_hour ? [null, null] : jsonElement.adding_info.closing_hour,
        },
        isMarkerSet: true,
    };
}

export function getElements(user: User):[string, string][] {
    let elements: [string, string][] = [];
    switch (user.role){
        case "student":
            elements = [["Area Personale", "/student-personal-area"],
                ["Notifiche", "/student-notifications"],
                ["Aule registrate", "/registered-rooms"]]
            break;
        case "teacher":
            elements = [["Area Personale", "/teacher-personal-area"],
                ["Modifica orario di ricevimento", "/time-table"],
                ["Gestisci i tuoi corsi", "/course-table"]]
            break;
        case "admin":
            elements = [["Aggiungi locale", "/add-room"],
                ["Elimina locale", "/delete-room"],
                ["Modifica locale", "/change-room"]]
    }
    return elements
}

export function closePopup(popupRef: React.RefObject<L.Popup>, id: number) {
    (popupRef.current?.getElement()?.children[id] as HTMLLinkElement).click()
}

export function generateIcon(type: string, id:string) {
    const iconMarkup = renderToStaticMarkup(
        type !== "none" ?
            <div className='marker-pin' id={id}><FontAwesomeIcon icon={locals.get(type) as IconDefinition}/></div> :
    <div className='marker-pin' id={id}/>
);
    return divIcon({
        className: 'custom-div-icon',
        html: iconMarkup,
        iconSize: [20, 42],
        iconAnchor: [15, 42]
    });
}
