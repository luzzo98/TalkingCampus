import {MapContainer, ImageOverlay, LayersControl, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js.map';
import {MutableRefObject, SyntheticEvent, useEffect, useRef, useState} from 'react';
import * as React from 'react'
import {markerDictionary} from '../Model';
import '../styles/mainPageStyle/MainPageStyle.scss'
import { renderToStaticMarkup } from "react-dom/server";
import {divIcon, LatLngBoundsLiteral, LatLngExpression, LayersControlEvent, LeafletEvent, Map} from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook, faChalkboardTeacher, faBath} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import floor1 from "../assets/floor1.svg"
import floor2 from "../assets/floor2.svg"
import groundFloor from "../assets/groundFloor.svg"
require('../slider')

const MapBox:React.FC = () => {

    const center:LatLngExpression = [40.743, -74.19];

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

    var baseMarker: markerDictionary = {
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

    const handleMapCreatedEvent = (m: Map) => {
        m.on("baselayerchange", (event:LayersControlEvent) => baseLayerChange(event))
    }

    return (
        <MapContainer center={center}
                      id={'map'}
                      maxZoom={14} minZoom={14} zoom={14}
                      whenCreated={handleMapCreatedEvent}
                      zoomControl={false}>
            <LayersControl position="bottomright">
                <LayersControl.BaseLayer name = "piano 2">
                    <ImageOverlay url={floor2} bounds={bounds}/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name = "piano 1" >
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
