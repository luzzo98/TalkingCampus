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

export function setClass(elementName: string, className: string) {
    const element = (elementName.includes("#") ? getElementOnViewById(elementName.slice(1))
                                               : getElementOnViewByClass(elementName))
    console.log(elementName.slice(1))
    const setClasses = element.getAttribute("class")
    element.setAttribute("class", setClasses + " " + className)
}

export function getScreenWidth() {return document.body.clientWidth}

export const mobileSize: number = 736
export const hdSize: number = 1280
