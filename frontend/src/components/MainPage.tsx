import {MapContainer, ImageOverlay, LayersControl, Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js.map';
import React, {Reducer, useEffect, useReducer, useRef, useState} from 'react';
import {RoomOnMap} from '../Model';
import '../styles/main_page/mainPageStyle.scss'
import { Control, LatLngBoundsLiteral, LatLngExpression, LayersControlEvent, LeafletMouseEvent, Map } from "leaflet";
import floor1 from "../assets/floor1.svg"
import floor2 from "../assets/floor2.svg"
import groundFloor from "../assets/groundFloor.svg"
import DefaultPopUp from "./DefaultPopUp";
import * as utils from "../utils/utils";
import DeletePopUp from "./DeletePopUp";
import EditPopUp from "./EditPopUp";
import {message} from "antd";
import {useMediaQuery} from "react-responsive";
import MainMenu from "./MainMenu";
import {CSSTransition} from "react-transition-group";
import MapService from "../services/MapService";
import getUser from "../services/UserLocalInfoGetter";

interface MapState {
    mode: string,
    currentPiano: number,
    markers: RoomOnMap[]
}

const MainPage : React.FC = () => {

    const [isMenuVisibleForMap, setMenuVisibleForMap] = useState(true)
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const [isOpeningView, setIsOpeningView] = useState(() => {
        setTimeout(() => { setIsOpeningView(true) }, 100);
        return false
    })
    const [dataFetched, setDataFetched] = useState(false);

    function getRooms(floor: number) {
        MapService.getRooms(floor, result => {
            setMapState({markers: result})
            setDataFetched(true)
        })
    }

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
        currentPiano: 1,
        markers: []
    }

    const [mapState, setMapState] = useReducer<Reducer<MapState, any>>(utils.reducer, initState)
    const mapStateRef = useRef<MapState>()
    mapStateRef.current = mapState
    const isMobile: boolean = useMediaQuery({ query: '(max-width: 736px)' })
    const isTabletOrMobile: boolean = useMediaQuery({ query: '(max-width: 1024px)' })

    useEffect(() => {
        if (getUser().role === "admin")
            message.info("Talking campus mode: " + mapState.mode,0.7)
    }, [mapState.mode])

    useEffect(() => {
        getRooms(mapState.currentPiano)
    },[mapState.currentPiano])

    function renderMarkers(floor: number) {
        return mapState.markers.filter(r => r.floor === floor).map(
            el => {
                return <Marker position={el.position} draggable={!el.isMarkerSet} icon={utils.generateIcon(el.type, el.name)}
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
                    {(!el.isMarkerSet || mapState.mode === "modifica") ?
                        <EditPopUp
                            offset={[2, -2]}
                            buttonText={mapState.mode}
                            yetExistent={el.isMarkerSet}
                            elem={el}
                            onSubmit={() => el.isMarkerSet = true}
                            onDelete={deleteIncompleteMarker}/>
                        : mapState.mode === "elimina" ? <DeletePopUp
                                offset={[2, -2]}
                                onDelete={() => {
                                    el.isMarkerSet = false
                                    deleteIncompleteMarker();
                                }}
                                room_id={el.name}/>
                            : mapState.mode === "aggiungi" ? null : <DefaultPopUp offset={[2, -2]} room={el}/>
                    }
                </Marker>
            }
        );
    }

    const baseLayerChange = (floorChanged: LayersControlEvent) => {
        const floor = Number(floorChanged.name.replace("piano ", ""))
        setMapState({ currentPiano: floor });
    }

    const addingMarker = (e: LeafletMouseEvent) => {
        if (mapStateRef.current?.mode === "aggiungi") {
            const piano: number = mapStateRef.current?.currentPiano
            const tempMarkers = mapStateRef.current?.markers
            tempMarkers.push({
                floor: piano,
                type: "",
                occupied_seats: 0,
                maximum_seats: 0,
                isMarkerSet: false,
                name: piano + "." + (mapStateRef.current?.markers.filter(r => r.floor === piano).length + 1),
                position: [e.latlng.lat, e.latlng.lng],
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
        return m.getZoom() === mobileMinLevelZoom || m.getZoom() === screenDefaultZoom
    }

    function noElementNotSet() : boolean {
        return ! mapStateRef.current?.markers.filter(m => m.floor === mapState.currentPiano).find(e => !e.isMarkerSet)
    }

    function setPreviousMapState() {
        setMapState({ mode: mapStateRef.current?.mode})
    }

    const handleMapEvent = (m: Map) => {
        sizingMap(m)
        m.on("baselayerchange", (event: LayersControlEvent) => baseLayerChange(event))
        m.on("resize", () => sizingMap(m))
        m.on("click", (e: LeafletMouseEvent) => {
            addingMarker(e)
        })
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
        let dicto = mapState.markers
        dicto = dicto.filter(e => e.isMarkerSet)
        setMapState({markers: dicto})
    }

    return (
        <div className={"main-container"}>
            <CSSTransition
                in={isOpeningView}
                timeout={800}
                classNames="slide-left-right"
            >
                <main className={"main"}>
                    <MainMenu toggleVisibility={isOpeningView}
                              visibilityFromMap={isMenuVisibleForMap}
                              onChangeMode={changeMode}
                              onClosure={() => {
                                  setIsOpeningView(false);
                                  setIsMenuCollapsed(true);
                              }
                              }/>
                    <MapContainer center={center}
                                  id={'map'}
                                  maxZoom={defaultZoom} minZoom={defaultZoom} zoom={defaultZoom}
                                  whenCreated={handleMapEvent}
                                  zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}
                                  bounds={bounds}
                                  keyboard={false} >
                        <LayersControl position="bottomright" collapsed={isMenuCollapsed}>
                            <LayersControl.BaseLayer name="piano 3">
                                <ImageOverlay url={floor2} bounds={bounds}/>
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="piano 2">
                                <ImageOverlay url={floor1} bounds={bounds}/>
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer checked name="piano 1">
                                <ImageOverlay url={groundFloor} bounds={bounds}/>
                            </LayersControl.BaseLayer>
                        </LayersControl>
                        {dataFetched ? renderMarkers(mapState.currentPiano) : ""}
                    </MapContainer>
                </main>
            </CSSTransition>
        </div>
    );
}
export default MainPage;

