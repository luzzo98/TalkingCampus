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

export const locals: {[id: string]: IconDefinition} = {
    "Aula_Studio" : faBook,
    "Laboratorio" : faFlask,
    "Bagno"       : faBath,
    "Segreteria"  : faFax,
    "Mensa"       : faCoffee,
    "Aula"        : faChalkboardTeacher,
}

export const reducer = (prevState: any, updatedProperty:any) => ({
    ...prevState,
    ...updatedProperty,
});

export function mapToRoom(jsonElement: any): RoomOnMap{
    return {
        type: jsonElement.type,
        maximum_seats: jsonElement.maximum_seats,
        occupied_seats: jsonElement.occupied_seats,
        name: jsonElement.name,
        floor: jsonElement.floor,
        position: jsonElement.position,
        observers: jsonElement.observers,
        phone_number: !jsonElement.adding_info ? "" :
            !jsonElement.adding_info.phone_number ? "" :
                jsonElement.adding_info.phone_number,
        opening_hour: !jsonElement.adding_info ? [-1, -1] :
            !jsonElement.adding_info.opening_hour ? [-1, -1] :
                [jsonElement.adding_info.opening_hour.hours,
                    jsonElement.adding_info.opening_hour.minutes],
        closing_hour: !jsonElement.adding_info ? [-1, -1] :
            !jsonElement.adding_info.closing_hour ? [-1, -1] :
                [jsonElement.adding_info.closing_hour.hours,
                    jsonElement.adding_info.closing_hour.minutes],
        isMarkerSet: true,
    };
}

//TODO: da fare sicuramente meglio
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

export function generateIcon(type: string, id:string) {
    const iconMarkup = renderToStaticMarkup(
        type !== "none" ?
            <div className='marker-pin' id={id}><FontAwesomeIcon icon={locals[type]}/></div> :
    <div className='marker-pin' id={id}/>
);
    return divIcon({
        className: 'custom-div-icon',
        html: iconMarkup,
        iconSize: [20, 42],
        iconAnchor: [15, 42]
    });
}

export const getOffset:() => LatLngTuple = () => [2, -2];
