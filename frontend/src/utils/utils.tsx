import {renderToStaticMarkup} from "react-dom/server";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook, faChalkboardTeacher, faBath, faCoffee, faFax, faFlask} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {divIcon} from "leaflet";
import * as React from "react";

export const BASE_URL = "http://" + (process.env.REACT_APP_ENDPOINT ? process.env.REACT_APP_ENDPOINT : "localhost") + ":"
export const NODE_PORT = "80"
export const SOCKET_IO_PORT = "8080"

export const locals: Map<string,IconDefinition> = new Map<string, IconDefinition>([
    ["Aula Studio", faBook],
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

export function getElements(role: string):[string, string][] {
    let elements: [string, string][] = [];
    switch (role){
        case "student":
            elements = [["Area Personale", "/personal-area"],
                ["Notifiche", "/student-notifications"],
                ["Locali registrati", "/registered-rooms"]]
            break;
        case "teacher":
            elements = [["Area Personale", "/personal-area"],
                ["Modifica orario di ricevimento", "/day-selector"],
                ["Gestisci i tuoi corsi", "/course-table"]]
            break;
        case "admin":
            elements = [["Aggiungi locale", "/add-room"],
                ["Elimina locale", "/delete-room"],
                ["Modifica locale", "/change-room"]]
    }
    return elements
}

const closeButtonIndex: number = 2;

export function closePopup(popupRef: React.RefObject<L.Popup>) {
    console.log(popupRef.current?.getElement()?.children[closeButtonIndex] as HTMLLinkElement);
    (popupRef.current?.getElement()?.children[closeButtonIndex] as HTMLLinkElement).click()
}

export function convertDay(index: number):string | null {
    let day = ""
    switch (index){
        case 1 : day = "Lunedì"; break
        case 2 : day = "Martedì"; break
        case 3 : day = "Mercoledì"; break
        case 4 : day = "Giovedì"; break
        case 5 : day = "Venerdì"; break
    }
    return day;
}

export function reverseDay(day: string):number{
    let index = 0;
    switch (day){
        case "Lunedì" : index = 1; break
        case "Martedì" : index = 2; break
        case "Mercoledì" : index = 3; break;
        case "Giovedì" : index = 4; break;
        case "Venerdì" : index = 5; break;
    }
    return index;
}

export function getSingleFormat(value: number){
    return value < 10 ? "0" + value : "" + value
}

export function getCorrectFormat(value: {hours: number, minutes: number}): string {
    return getSingleFormat(value.hours) + ":" + getSingleFormat(value.minutes)
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
