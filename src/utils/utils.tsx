import {IMarker, User} from "../Model";
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
import {divIcon} from "leaflet";
import * as React from "react";
import {useMediaQuery} from "react-responsive";

export const locals: {[id: string]: IconDefinition} = {
    "aula-studio" : faBook,
    "laboratorio" : faFlask,
    "bagno"       : faBath,
    "segreteria"  : faFax,
    "mensa"       : faCoffee,
    "aula"        : faChalkboardTeacher,
}

export const reducer = (prevState: any, updatedProperty:any) => ({
    ...prevState,
    ...updatedProperty,
});

export function getElementOnViewByClass(className: string): HTMLCollection {
    return document.getElementsByClassName(className);
}

export function getElementOnViewById(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
}

export function isVisible(el: Element) {
    const style = window.getComputedStyle(el);
    return (style.left !== '0px')
}

export function setClassById(elementName: string, className: string) {
    const element = getElementOnViewById(elementName)
    const setClasses = element.getAttribute("class")
    element.setAttribute("class", setClasses + " " + className)
}

function editElementByClass(elementName: string,
                                className: string,
                                doOnElement: (e: Element, className: string) => void) {
    const element = getElementOnViewByClass(elementName)
    for (let i = 0; i < element.length; i++) {
        doOnElement(element[i], className)
    }
}

export function removeClassByClass(elementName: string, className: string) {
    editElementByClass(elementName, className, (el, className) => {
        const setClasses = el.hasAttribute("class") ? el.getAttribute("class") as string : ""
        el.setAttribute("class", setClasses.replace(className, ""))
    })
}

export function setClassByClass(elementName: string, className: string) {
    editElementByClass(elementName, className, (el, className) =>{
        const setClasses = el.getAttribute("class")
        el.setAttribute("class", setClasses + " " + className)
    })
}

export function getScreenWidth() {return document.body.clientWidth}

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
