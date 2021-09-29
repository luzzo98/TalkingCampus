import {MapContainer, ImageOverlay, LayersControl, Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js.map';
import React, {Reducer, useEffect, useReducer, useRef, useState} from 'react';
import {MainpageContents, MarkerDictionary, Room} from '../Model';
import '../styles/main_page/mainPageStyle.scss'
import { Control, LatLngBoundsLiteral, LatLngExpression, LatLngTuple, LayersControlEvent, LeafletMouseEvent, Map} from "leaflet";
import floor1 from "../assets/floor1.svg"
import floor2 from "../assets/floor2.svg"
import groundFloor from "../assets/groundFloor.svg"
import DefaultPopUp from "./DefaultPopUp";
import {useLocation} from "react-router-dom";
import * as utils from "../utils/utils";
import DeletePopUp from "./DeletePopUp";
import EditPopUp from "./EditPopUp";
import {message} from "antd";
import {useMediaQuery} from "react-responsive";
import MainMenu from "./MainMenu";

//Devono essere richiesti da db ovviamente
let id: number = 20

const baseMarker: MarkerDictionary = {
    "piano 0": [
        { id: "piano-0-0", position: [40.757059, -74.198484], type: "aula", isMarkerSet: true },
        { id: "piano-0-1", position: [40.750755, -74.195824], type: "aula-studio", isMarkerSet: true },
        { id: "piano-0-2", position: [40.750755, -74.201059], type: "aula-studio", isMarkerSet: true },
        { id: "piano-0-3", position: [40.736194, -74.184837], type: "bagno", isMarkerSet: true},
        { id: "piano-0-4", position: [40.735226, -74.20045], type: "aula", isMarkerSet: true },
        { id: "piano-0-5", position: [40.735226, -74.19450], type: "aula", isMarkerSet: true },
        { id: "piano-0-6", position: [40.733275, -74.190587], type: "bagno", isMarkerSet: true },
        { id: "piano-0-7", position: [40.753694, -74.163894], type: "bagno", isMarkerSet: true},
        { id: "piano-0-8", position: [40.72755, -74.202175], type: "aula-studio", isMarkerSet: true},
        { id: "piano-0-9", position: [40.72755, -74.198398], type: "aula-studio", isMarkerSet: true },
        { id: "piano-0-10", position: [40.745891, -74.158401], type: "mensa", isMarkerSet: true},
        { id: "piano-0-11", position: [40.73366, -74.15711], type: "segreteria", isMarkerSet: true},
        { id: "piano-0-12", position: [40.728201, -74.178485], type: "laboratorio", isMarkerSet: true},
        { id: "piano-0-13", position: [40.728201, -74.172306], type: "laboratorio", isMarkerSet: true},
    ],
    "piano 1": [
        { id: "piano-1-1", position: [40.757059, -74.198484], type: "aula", isMarkerSet: true},
        { id: "piano-1-2", position: [40.757059, -74.194536], type: "aula", isMarkerSet: true},
        { id: "piano-1-3", position: [40.756710, -74.18887], type: "aula", isMarkerSet: true},
        { id: "piano-1-4", position: [40.756710, -74.181919], type: "aula", isMarkerSet: true},
        { id: "piano-1-5", position: [40.74745, -74.16200], type: "mensa", isMarkerSet: true},
        { id: "piano-1-6", position: [40.75070, -74.19127], type: "bagno", isMarkerSet: true},
        { id: "piano-1-7", position: [40.74556, -74.15917], type: "segreteria", isMarkerSet: true},
        { id: "piano-1-8", position: [40.75330, -74.16337], type: "bagno", isMarkerSet: true},
        { id: "piano-1-9", position: [40.73711, -74.185009], type: "bagno", isMarkerSet: true},
        { id: "piano-1-10", position: [40.750768, -74.2019], type: "aula-studio", isMarkerSet: true},
        { id: "piano-1-11", position: [40.73451, -74.19522], type: "aula-studio", isMarkerSet: true},
        { id: "piano-1-12", position: [40.75245, -74.18363], type: "laboratorio", isMarkerSet: true},
        { id: "piano-1-13", position: [40.75245, -74.18037], type: "laboratorio", isMarkerSet: true},
        { id: "piano-1-14", position: [40.73327, -74.16844], type: "bagno", isMarkerSet: true},
        { id: "piano-1-15", position: [40.72787, -74.16200], type: "aula", isMarkerSet: true}
    ],
    "piano 2": [
        { id: "piano-2-1", position: [40.75759, -74.19651], type: "aula-studio", isMarkerSet: true},
        { id: "piano-2-2", position: [40.75050, -74.19470], type: "aula-studio", isMarkerSet: true},
        { id: "piano-2-3", position: [40.75362, -74.16320], type: "bagno", isMarkerSet: true},
        { id: "piano-2-4", position: [40.74036, -74.15780], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-5", position: [40.74335, -74.15780], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-6", position: [40.74335, -74.15780], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-7", position: [40.73301, -74.16870], type: "bagno", isMarkerSet: true},
        { id: "piano-2-8", position: [40.73301, -74.19007], type: "bagno", isMarkerSet: true},
        { id: "piano-2-9", position: [40.75265, -74.15651], type: "segreteria", isMarkerSet: true},
        { id: "piano-2-10", position: [40.75050, -74.1914], type: "bagno", isMarkerSet: true},
        { id: "piano-2-11", position: [40.75206, -74.1914], type: "bagno", isMarkerSet: true},
        { id: "piano-2-12", position: [40.73203, -74.18397], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-13", position: [40.73203, -74.18037], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-14", position: [40.73203, -74.17676], type: "laboratorio", isMarkerSet: true},
        { id: "piano-2-15", position: [40.7319, -74.1696],  type: "bagno", isMarkerSet: true}
    ]
}

interface MapState {
    mode: string,
    currentPiano: string,
    markers: MarkerDictionary
}

const MainPage : React.FC = () => {

    const [isMenuVisibleForMap, setMenuVisibleForMap] = useState(true)
    const [isOpeningView, setIsOpeningView] = useState(true)

    const center: LatLngExpression = [40.743, -74.185];
    const mobileCenter: LatLngExpression = [40.753, -74.176];

    const defaultZoom: number = 14
    const mobileMinLevelZoom: number = 12.49;
    const mobileMaxLevelZoom: number = 13.75;
    const screenDefaultZoom: number = 13.25;
    const screenMaxZoom: number = 14;
    let firstInitialization: boolean = true

    const bounds: LatLngBoundsLiteral = [
        [40.712216, -74.22655],
        [40.773941, -74.12544]
    ];

    const initState: MapState = {
        mode: 'default',
        currentPiano: 'piano 0',
        markers: baseMarker
    }

    let data = useLocation();
    const mainContents: MainpageContents = data.state as MainpageContents
    const [mapState, setMapState] = useReducer<Reducer<MapState, any>>(utils.reducer, initState)
    const mapStateRef = useRef<MapState>()
    mapStateRef.current = mapState
    const isMobile: boolean = useMediaQuery({ query: '(max-width: 736px)' })
    const isTabletOrMobile: boolean = useMediaQuery({ query: '(max-width: 1024px)' })

    useEffect(() => {
        if (mainContents.user.role === "admin")
            message.info("Talking campus mode: " + mapState.mode,0.7)
    }, [mapState.mode])

    function renderMarkers(floor: string) {
        const mockRoom: Room = {
            type: "aula",
            occupied_seats: 23,
            total_seats: 80,
            lesson_name: "Sistemi Operativi",
            start: "10:00",
            end: "12:00",
            teacher: "Vittorio Ghini"
        }
        return mapState.markers[floor].map(
            el => {
                return <Marker
                            position={el.position}
                            draggable={!el.isMarkerSet}
                            icon={utils.generateIcon(el.type, el.id)}
                            eventHandlers={{
                                add: (e) => {
                                    if(!el.isMarkerSet) {
                                        (e.target as L.Marker).openPopup()
                                    }
                                },
                                dragend: (e) => {
                                    const newPos = (e.target as L.Marker).getLatLng()
                                    el.position = [newPos.lat, newPos.lng]
                                }
                            }}
                         >
                             {   !el.isMarkerSet ? <EditPopUp onSubmit={(type) => {
                                                                            el.type = type
                                                                            el.isMarkerSet = true
                                                                      }
                                                             } onDelete={deleteIncompleteMarker}/>
                                 : mapState.mode === "modifica" ? <EditPopUp onSubmit={(type) => {
                                                                            el.type = type
                                                                        }
                                                                    }
                                                                    onDelete={deleteIncompleteMarker}
                                                                    name={"Aula"}
                                                                    type={el.type}
                                                                    seats={"100"}/>
                                     : mapState.mode === "elimina" ? <DeletePopUp room_id={mockRoom.type}/>
                                         : mapState.mode === "aggiungi" ? null : <DefaultPopUp room={mockRoom}/>
                             }
                         </Marker>
            }
        );
    }

    const baseLayerChange = (floorChanged: LayersControlEvent) => {
        setMapState({ currentPiano: floorChanged.name });
    }

    const addingMarker = (e: LeafletMouseEvent) => {
        if (mapStateRef.current?.mode === "aggiungi") {
            const piano: string = mapState.currentPiano ? mapState.currentPiano : ""
            const tempMarkers = mapState.markers
            tempMarkers[piano].push({
                id: "piano-" + (piano.split(" ")[1]) + "-" + id++,
                type: "none",
                position: [e.latlng.lat, e.latlng.lng] as LatLngTuple,
                isMarkerSet: false
            })
            setMapState({ markers: tempMarkers })
        }
    }

    function sizingMap(m: Map) {
        if (isTabletOrMobile) {
            if (isMobile) {
                m.setMinZoom(mobileMinLevelZoom); m.setMaxZoom(mobileMaxLevelZoom); m.setZoom(mobileMinLevelZoom)
            } else {
                m.setMinZoom(screenDefaultZoom); m.setMaxZoom(screenMaxZoom); m.setZoom(screenDefaultZoom)
            }
            m.dragging.enable()
            if(firstInitialization){
                m.addControl(new Control.Zoom({position: "bottomleft"}))
                firstInitialization = false
            }
            m.setView(mobileCenter)
        } else {
            m.setMaxZoom(screenDefaultZoom); m.setMinZoom(screenDefaultZoom); m.setView(center)
            m.dragging.disable()
        }
        setMenuVisibleForMap(true)
    }

    function isLowestZoomLevel(m: Map): boolean {
        return m.getZoom() == mobileMinLevelZoom || m.getZoom() == screenDefaultZoom
    }

    function noElementNotSet() : boolean {
        return ! mapState.markers[mapState.currentPiano].find(e => !e.isMarkerSet)
    }

    function setPreviousMapState() {
        setMapState({ mode: mapStateRef.current?.mode})
    }
    const handleMapEvent = (m: Map) => {
        sizingMap(m)
        m.on("baselayerchange", (event: LayersControlEvent) => baseLayerChange(event))
        m.on("resize", () => sizingMap(m))
        m.on("click", (e: LeafletMouseEvent) => addingMarker(e))
        m.on("zoom", () => {
            if (isLowestZoomLevel(m)) {
                m.panTo(mobileCenter); m.dragging.disable();
                setMenuVisibleForMap(true)
            } else {
                setMenuVisibleForMap(false)
                m.dragging.enable()
            }
        })
        m.on('popupclose', () => {
            if(!isTabletOrMobile || isLowestZoomLevel(m))
                sizingMap(m)
            setTimeout(() => {
                if (noElementNotSet()){
                    setPreviousMapState()
                }
            }, 200)
        })
    }

    function changeMode(mode: string) {
        mapState.mode === mode ? setMapState({ mode: "default" }) : setMapState({ mode: mode})
        deleteIncompleteMarker()
    }

    function deleteIncompleteMarker() {
        const dicto = mapState.markers
        dicto[mapState.currentPiano] = dicto[mapState.currentPiano].filter(e => e.isMarkerSet)
        setMapState({markers: dicto})
    }

    return (
        <div className={"main-container"}>
            <main className={"main " + (isOpeningView ? "" : "slide-right")}>
                <MainMenu toggleVisibility={isOpeningView}
                          visibilityFromMap={isMenuVisibleForMap}
                          mainContents={mainContents}
                          onChangeMode={changeMode}
                          onClosure={() => setIsOpeningView(false)}/>
                <MapContainer center={center}
                              id={'map'}
                              maxZoom={defaultZoom} minZoom={defaultZoom} zoom={defaultZoom}
                              whenCreated={handleMapEvent}
                              zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}
                              dragging={false}
                              bounds={bounds}
                              className={"slide-left"}
                              keyboard={false} >
                    <LayersControl position="bottomright" collapsed={!isOpeningView}>
                        <LayersControl.BaseLayer name="piano 2">
                            <ImageOverlay url={floor2} bounds={bounds}/>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="piano 1">
                            <ImageOverlay url={floor1} bounds={bounds}/>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked name="piano 0">
                            <ImageOverlay url={groundFloor} bounds={bounds}/>
                        </LayersControl.BaseLayer>
                    </LayersControl>
                    {renderMarkers(mapState.currentPiano)}
                </MapContainer>
            </main>
        </div>
    );
}
export default MainPage;

