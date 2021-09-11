import {User} from "../Model";

export function getElementOnViewByClass(className: string): HTMLElement {
    const elem = document.getElementsByClassName(className).item(0);
    return elem as HTMLElement;
}

export function getElementOnViewById(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
}

export function isHidden(el: Element) {
    const style = window.getComputedStyle(el);
    return (style.visibility === 'hidden')
}

function getElement(elementName: string){
    return elementName.includes("#") ? getElementOnViewById(elementName.slice(1)) : getElementOnViewByClass(elementName)
}

export function setClass(elementName: string, className: string) {
    const element = getElement(elementName)
    const setClasses = element.getAttribute("class")
    element.setAttribute("class", setClasses + " " + className)
}

export function removeClass(elementName: string, className: string) {
    const element = getElement(elementName)
    const setClasses = element.hasAttribute("class") ? element.getAttribute("class") as string : ""
    element.setAttribute("class", setClasses.replace(className, ""))
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


export const mobileSize: number = 736
export const hdSize: number = 1280
