import {MapContainer, ImageOverlay, LayersControl, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js.map';
import {useState} from 'react';
import * as React from 'react'
import {MarkerDictionary} from '../Model';
import '../styles/mainPageStyle/mainPageStyle.scss'
import { renderToStaticMarkup } from "react-dom/server";
import {
    Control,
    divIcon,
    LatLngBoundsLiteral,
    LatLngExpression, LatLngTuple,
    LayersControlEvent,
    LeafletMouseEvent,
    Map
} from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook, faChalkboardTeacher, faBath, faCoffee, faFax, faFlask} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import floor1 from "../assets/floor1.svg"
import floor2 from "../assets/floor2.svg"
import groundFloor from "../assets/groundFloor.svg"
import $ from "jquery"

const MapBox:React.FC = () => {

    const center:LatLngExpression = [40.743, -74.185];
    const mobileCenter:LatLngExpression = [40.753, -74.176];
    const offset:LatLngTuple = [-5, +7];

    const defaultZoom: number = 14
    const mobileMinLevelZoom: number = 12.49;
    const mobileMaxLevelZoom: number = 13.75;
    const screenDefaultZoom: number = 13.25;
    const screenMaxZoom: number = 14;

    const mobileSize: number = 736
    const hdSize: number = 1280

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
            { position: [40.736194, -74.184837], icon: generateIcon(faBath) },
            { position: [40.735226, -74.20045], icon: generateIcon(faChalkboardTeacher) },
            { position: [40.735226, -74.19450], icon: generateIcon(faChalkboardTeacher) },
            { position: [40.733275, -74.190587], icon: generateIcon(faBath)},
            { position: [40.753694, -74.163894], icon: generateIcon(faBath)},
            { position: [40.72755, -74.202175], icon: generateIcon(faBook)},
            { position: [40.72755, -74.198398], icon: generateIcon(faBook)},
            { position: [40.745891, -74.158401], icon: generateIcon(faCoffee)},
            { position: [40.73366, -74.15711], icon: generateIcon(faFax)},
            { position: [40.728201, -74.194622], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.728201, -74.191000], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.728201, -74.187498], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.728201, -74.184000], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.728201, -74.178485], icon: generateIcon(faFlask)},
            { position: [40.728201, -74.172306], icon: generateIcon(faFlask)},
            { position: [40.751353, -74.18200], icon: generateIcon(faFlask)},
            { position: [40.751353, -74.17460], icon: generateIcon(faFlask)},
            { position: [40.752063, -74.19130], icon: generateIcon(faBath)},
            { position: [40.750833, -74.19130], icon: generateIcon(faBath)},
            { position: [40.75388, -74.1548], icon: generateIcon(faBath)},
            { position: [40.751753, -74.1548], icon: generateIcon(faBath)},
            { position: [40.757059, -74.178485], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.757059, -74.16220], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.735226, -74.178485], icon:generateIcon(faChalkboardTeacher)},
            { position: [40.73308, -74.16947], icon: generateIcon(faBath)},
            { position: [40.727811, -74.158401], icon: generateIcon(faFlask)},
            { position: [40.736194, -74.1829], icon: generateIcon(faBath)}
        ],
        "piano 1": [
            { position: [40.757059, -74.198484], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.757059, -74.194536], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.756710, -74.18887], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.756710, -74.181919], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.756710, -74.17480], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.756710, -74.16732], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.756710, -74.15994], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.74745, -74.16200], icon: generateIcon(faCoffee)},
            { position: [40.75070, -74.19127], icon: generateIcon(faBath)},
            { position: [40.73262, -74.15711], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.74556, -74.15917], icon: generateIcon(faFax)},
            { position: [40.75330, -74.16337], icon:generateIcon(faBath)},
            { position: [40.73535, -74.17848], icon:generateIcon(faChalkboardTeacher)},
            { position: [40.73711, -74.185009], icon: generateIcon(faBath)},
            { position: [40.73711, -74.18294], icon: generateIcon(faBath)},
            { position: [40.72787, -74.19625], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.75063, -74.19839], icon: generateIcon(faChalkboardTeacher)},
            { position: [40.750768, -74.2019], icon: generateIcon(faBook)},
            { position: [40.73451, -74.19814], icon: generateIcon(faBook)},
            { position: [40.73451, -74.19522], icon: generateIcon(faBook)},
            { position: [40.73711, -74.19419], icon: generateIcon(faBook)},
            { position: [40.73711, -74.19693], icon: generateIcon(faBook)},
            { position: [40.73327, -74.19067], icon: generateIcon(faBath)},
            { position: [40.73711, -74.1914], icon: generateIcon(faBook)},
            { position: [40.75245, -74.18363], icon: generateIcon(faFlask)},
            { position: [40.75245, -74.18037], icon: generateIcon(faFlask)},
            { position: [40.75245, -74.17668], icon: generateIcon(faFlask)},
            {position: [40.75245, -74.17316], icon: generateIcon(faFlask)},
            {position: [40.75245, -74.16921], icon: generateIcon(faFlask)},
            {position: [40.75063, -74.19479], icon: generateIcon(faChalkboardTeacher)},
            {position: [40.73327, -74.16844], icon: generateIcon(faBath)},
            {position: [40.72787, -74.19127], icon: generateIcon(faChalkboardTeacher)},
            {position: [40.72787, -74.19127], icon: generateIcon(faChalkboardTeacher)},
            {position: [40.72787, -74.18612], icon: generateIcon(faChalkboardTeacher)},
            {position: [40.72787, -74.17848], icon: generateIcon(faChalkboardTeacher)},
            {position: [40.72787, -74.16200], icon: generateIcon(faChalkboardTeacher)}
        ],
        "piano 2": [
            { position: [40.75759, -74.19651], icon: generateIcon(faBook)},
            { position: [40.75050, -74.19470], icon: generateIcon(faBook)},
            { position: [40.75232, -74.19831], icon: generateIcon(faBook)},
            { position: [40.75362, -74.16320], icon: generateIcon(faBath)},
            { position: [40.74036, -74.15780], icon: generateIcon(faFlask)},
            { position: [40.74335, -74.15780], icon: generateIcon(faFlask)},
            { position: [40.74335, -74.15780], icon: generateIcon(faFlask)},
            { position: [40.74712, -74.15780], icon: generateIcon(faFlask)},
            { position: [40.73301, -74.16870], icon: generateIcon(faBath)},
            { position: [40.73301, -74.19007], icon: generateIcon(faBath)},
            { position: [40.72982, -74.19101], icon: generateIcon(faFlask)},
            { position: [40.75265, -74.15651], icon: generateIcon(faFax)},
            { position: [40.75050, -74.1914], icon: generateIcon(faBath)},
            { position: [40.75206, -74.1914], icon: generateIcon(faBath)},
            { position: [40.73203, -74.18397], icon: generateIcon(faFlask)},
            { position: [40.73203, -74.18037], icon: generateIcon(faFlask)},
            { position: [40.73203, -74.17676], icon: generateIcon(faFlask)},
            { position: [40.7319, -74.1696], icon: generateIcon(faBath)},
            { position: [40.7373, -74.1602], icon: generateIcon(faBath)},
            { position: [40.7544, -74.1821], icon: generateIcon(faFlask)},
            { position: [40.7544, -74.17299], icon: generateIcon(faFlask)},
            { position: [40.7544, -74.1693], icon: generateIcon(faFlask)},
        ]
    }

    const [markers, setMarkers] = useState<JSX.Element[]>(renderMarkers('piano 0'));

    function renderMarkers(floor:string){
        const infos = baseMarker[floor]
        return infos.map(
            el =>
                <Marker position={el.position} icon={el.icon}>
                    <Popup offset={offset}>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                </Marker>
        );
    }

    function sizingMap(m: Map) {
        const val:number = $("#map").width() as number
        if (val < hdSize) {
            if(val < mobileSize) {
                m.setMinZoom(mobileMinLevelZoom); m.setMaxZoom(mobileMaxLevelZoom); m.setZoom(mobileMinLevelZoom)
            } else {
                m.setMinZoom(screenDefaultZoom); m.setMaxZoom(screenMaxZoom); m.setZoom(screenDefaultZoom)
            }
            m.dragging.enable()
            m.addControl(new Control.Zoom({position:"bottomleft"}))
        } else {
            m.setMaxZoom(screenDefaultZoom); m.setMinZoom(screenDefaultZoom)
            m.setView(center)
            m.dragging.disable()
        }
        getElementOnViewById("drawer-toggle").click()
    }

    function getElementOnViewByClass(className: string): HTMLElement {
        const elem = document.getElementsByClassName(className).item(0);
        return elem as HTMLElement;
    }

    function getElementOnViewById(id: string): HTMLElement {
        return document.getElementById(id) as HTMLElement;
    }

    function isHidden(el: Element) {
        const style = window.getComputedStyle(el);
        return (style.visibility === 'hidden')
    }

    function changeControlLayerVisibility(visibilityAttribute: string){
        getElementOnViewByClass("leaflet-control-layers").style.visibility = visibilityAttribute
    }

    function createSpaceForMap() {
        const firstButton = getElementOnViewByClass("corner-button")
        if (!isHidden(firstButton as Element)) {
            getElementOnViewById("drawer-toggle").click()
            getElementOnViewById("drawer-toggle-label").style.pointerEvents = "none"
        }
        changeControlLayerVisibility("hidden")
    }

    function setMenuVisible(){
        getElementOnViewById("drawer-toggle-label").style.pointerEvents = "auto"
        const button = getElementOnViewByClass("corner-button")
        if(isHidden(button)) {
            getElementOnViewById("drawer-toggle").click()
        }
        changeControlLayerVisibility("visible")
    }

    function isLowestZoomLevel(m: Map):boolean {
        return m.getZoom() == mobileMinLevelZoom || m.getZoom() == screenDefaultZoom
    }

    const handleMapCreatedEvent = (m: Map) => {
        sizingMap(m)
        m.on("baselayerchange", (event:LayersControlEvent) => baseLayerChange(event))
        m.on("resize", () => sizingMap(m))
        m.on("click", (e:LeafletMouseEvent) => {
            console.log(e.latlng)
        })
        m.on("zoom", () => {
            if (isLowestZoomLevel(m)) {
                m.panTo(mobileCenter)
                m.dragging.disable()
                setMenuVisible()
            } else {
                createSpaceForMap()
                m.dragging.enable()
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
            <LayersControl position="bottomright" collapsed={false}>
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
}

export default MapBox;
