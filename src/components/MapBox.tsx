import {MapContainer, ImageOverlay, LayersControl, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js.map';
import {useState} from 'react';
import * as React from 'react'
import {MarkerDictionary} from '../Model';
import '../styles/mainPageStyle/mainPageStyle.scss'
import { renderToStaticMarkup } from "react-dom/server";
import { Control, divIcon, LatLngBoundsLiteral, LatLngExpression, LayersControlEvent, Map } from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook, faChalkboardTeacher, faBath} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import floor1 from "../assets/floor1.svg"
import floor2 from "../assets/floor2.svg"
import groundFloor from "../assets/groundFloor.svg"
import $ from "jquery"

const MapBox:React.FC = () => {

    const center:LatLngExpression = [40.743, -74.185];

    const defaultZoom: number = 14;
    const mobileMinLevelZoom: number = 12.49;
    const mobileMaxLevelZoom: number = 13.50;
    const screenDefaultZoom: number = 13.50

    const mobileSize: number = 800
    const hdSize: number = 1080

    let attributes: {[id: string]: string[]} = {};

    const bounds:LatLngBoundsLiteral = [
        [40.712216, -74.22655],
        [40.773941, -74.12544]
    ];

    function generateIcon(className:IconDefinition) {
        const iconMarkup = renderToStaticMarkup(
            <div className='marker-pin'><FontAwesomeIcon icon={className}/></div>
    );
        return divIcon({
            className: 'custom-div-icon',
            html: iconMarkup,
            iconSize: [20, 42],
            iconAnchor: [15, 42]
        });
    }

    const baseLayerChange = (floor: LayersControlEvent) => {
        setMarkers(renderMarkers(floor.name));
    }

    const baseMarker: MarkerDictionary = {
        "piano 0": [
            { position: [40.757059, -74.198484], icon: generateIcon(faChalkboardTeacher) },
            { position: [40.750755, -74.195824], icon: generateIcon(faBook) },
            { position: [40.750755, -74.201059], icon: generateIcon(faBook) },
            { position: [40.736194, -74.184837], icon: generateIcon(faBath) }

        ],
        "piano 1": [
            {
                position: [40.757059, -74.198484],
                icon: generateIcon(faBook)
            }
        ],
        "piano 2": [
            {
                position: [40.757059, -74.198484],
                icon: generateIcon(faBook)
            }
        ]
    }

    const [markers, setMarkers] = useState<JSX.Element[]>(renderMarkers('piano 0'));

    function renderMarkers(floor:string){
        const infos = baseMarker[floor]
        return infos.map(
            el =>
                <Marker position={el.position} icon={el.icon}>
                    <Popup position={el.position}>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                </Marker>
        );
    }

    function sizingMap(m: Map) {
        const val:number = $("#map").width() as number
        if (val > mobileSize && val < hdSize) {
            m.setMinZoom(screenDefaultZoom); m.setMaxZoom(screenDefaultZoom)
            m.setView(center)
            m.dragging.disable()
        } else if(val < mobileSize) {
            m.setMinZoom(mobileMinLevelZoom); m.setMaxZoom(mobileMaxLevelZoom); m.setZoom(mobileMinLevelZoom)
            m.dragging.enable()
            m.addControl(new Control.Zoom({position:"bottomleft"}))
        } else {
            m.setMaxZoom(defaultZoom); m.setMinZoom(defaultZoom)
            m.setView(center)
            m.dragging.disable()
        }
        getElementOnViewById("drawer-toggle").click()
        setControlLayerVisible()
    }

    function writeTransformRule(x: string = "-32px", y: string = "71px"):string {
        return "transform: translate3d(" + x + ", " + y + ", 0px);"
    }

    function getChildrenOfComponent(name:string):HTMLCollection {return document.getElementsByClassName(name).item(0)?.children as HTMLCollection}

    function getElementOnViewByClass(className: string): HTMLElement {
        const elem = document.getElementsByClassName(className).item(0);
        return elem as HTMLElement;
    }

    function getElementOnViewById(id: string): HTMLElement {
        return document.getElementById(id) as HTMLElement;
    }

    function getComponents(name:string){
        const children = getChildrenOfComponent(name)
        let styles: string[] = []
        for (let i:number = 0; i < children.length; i++) {
            styles.push(children.item(i)?.getAttribute("style") as string)
        }
        attributes[name] = styles
    }

    function getElementsWithSelectors(selectors:string) {
        return document.querySelectorAll(selectors)
    }

    function setStyles() {
        for(let key in attributes) {
            const style = attributes[key]
            const children = getChildrenOfComponent(key)
            for(let i: number = 0; i < children.length; i++){
                children.item(i)?.setAttribute("style", style[i])
            }
        }
    }

    function isHidden(el: Element) {
        const style = window.getComputedStyle(el);
        return (style.visibility === 'hidden')
    }

    function setControlLayerVisible() {
        const controlLayer = getElementOnViewByClass("leaflet-control-layers")
        const className: string = controlLayer.className
        controlLayer.className = className + " leaflet-control-layers-expanded"
    }

    function createSpaceForMap() {
        const firstButton = getElementOnViewByClass("corner-button")
        if (!isHidden(firstButton as Element)) {
            getElementOnViewById("drawer-toggle").click()
            getElementOnViewById("drawer-toggle-label").style.pointerEvents = "none"
        }
    }

    function setTransition() {
        return "transition: all 0.7s ease-in-out;"
    }

    function setMenuVisible(){
        const maps = getElementOnViewByClass("leaflet-map-pane");
        getElementOnViewById("drawer-toggle-label").style.pointerEvents = "auto"

        maps.setAttribute("style", writeTransformRule() + setTransition())
        setTimeout(() => {
            maps.setAttribute("style", writeTransformRule())
            const button = getElementOnViewByClass("corner-button")
            if(isHidden(button)) {
                getElementOnViewById("drawer-toggle").click()
            }
        }, 500)
    }

    let firstTime: Boolean = true

    function getElementsOfMapStyles(){
        attributes = {}
        const divs = ["leaflet-overlay-pane", "leaflet-marker-pane", "leaflet-zoom-animated"]
        divs.forEach((e) => getComponents(e))
    }

    function isLowestZoomLevel(m: Map):boolean {
        return m.getZoom() == mobileMinLevelZoom
    }

    function performOnButton(predicate: (button: HTMLInputElement) => void){
        getElementsWithSelectors("input[type='radio'], .leaflet-control-layers-selector").forEach(b => predicate(b as HTMLInputElement))
    }

    const handleMapCreatedEvent = (m: Map) => {
        sizingMap(m)
        m.on("baselayerchange", (event:LayersControlEvent) => baseLayerChange(event))
        m.on("resize", () => sizingMap(m))
        m.on("click", () => setControlLayerVisible())
        m.on("zoom", () => {
            setControlLayerVisible();
            setTimeout(() => {
                if (isLowestZoomLevel(m)) {
                    setMenuVisible()
                    if(firstTime){
                        firstTime = false
                        getElementsOfMapStyles()
                    } else {
                        setStyles()
                    }
                    m.dragging.disable()
                } else {
                    createSpaceForMap()
                    m.dragging.enable()
                }
                isLowestZoomLevel(m) ? getElementOnViewByClass("leaflet-control-layers").style.visibility = "visible"
                                     : getElementOnViewByClass("leaflet-control-layers").style.visibility = "hidden"
            }, 100)
        })
        performOnButton(b => {
            b.onclick = () => {
                setTimeout(() => {
                    setStyles()
                    setControlLayerVisible()
                }, 5)
            }
        })
}

    return (
        <MapContainer center={center}
                      id={'map'}
                      maxZoom={defaultZoom} minZoom={defaultZoom} zoom={defaultZoom}
                      whenCreated={handleMapCreatedEvent}
                      zoomControl={false}
                      dragging={false}
                      bounds={bounds}
                      scrollWheelZoom={false}>
            <LayersControl position="bottomright">
                <LayersControl.BaseLayer name = "piano 2">
                    <ImageOverlay url={floor2} bounds={bounds}/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name = "piano 1">
                    <ImageOverlay url={floor1} bounds={bounds}></ImageOverlay>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name = "piano 0">
                    <ImageOverlay url={groundFloor} bounds={bounds}></ImageOverlay>
                </LayersControl.BaseLayer>
            </LayersControl>
            {markers}
        </MapContainer>
    );
    /*

    var bookIcon = new Icon({html: generateHtml('fa-book')})
    var receptionIcon = new Icon({html: generateHtml('fa-fax')})
    var classroomIcon = new Icon({html: generateHtml('fa-chalkboard-teacher')})
    var bathroomIcon = new Icon({html: generateHtml('fa-bath')})
    var cafeIcon = new Icon({html: generateHtml('fa-coffee')})

    var baseMarker = {
        "Piano 0": [
            L.marker([40.757059, -74.198484], {icon: classroomIcon}),
            L.marker([40.736194, -74.184837], {icon: bathroomIcon}),
            L.marker([40.757059, -74.161835], {icon: classroomIcon}),
            L.marker([40.727871, -74.191189], {icon: classroomIcon}),
            L.marker([40.727871, -74.187412], {icon: classroomIcon}),
            L.marker([40.727871, -74.194965], {icon: classroomIcon}),
            L.marker([40.727871, -74.183979], {icon: classroomIcon}),
            L.marker([40.732748, -74.156857], {icon: classroomIcon}),
            L.marker([40.745815, -74.157715], {icon: cafeIcon}),
            L.marker([40.757059, -74.178057], {icon: classroomIcon}),
            L.marker([40.750755, -74.201059], {icon: bookIcon}),
            L.marker([40.750755, -74.195824], {icon: bookIcon}),
            L.marker([40.727091, -74.159002], {icon: receptionIcon})
        ]
    }*/
}

export default MapBox;
