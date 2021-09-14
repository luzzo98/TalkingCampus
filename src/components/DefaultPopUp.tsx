import React from "react";
import {ModalTitle} from "react-bootstrap";
import {Room} from "../Model";
import {Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import {Button} from "antd";
require("../styles/pop_up/popUpStyle.scss")

interface Props {
    room: Room,
    offset: [number, number]
}

const DefaultPopUp: React.FC<Props> = ({room, offset}) => {
    return (
        <Popup offset={offset}>
            <ModalTitle> {room.room_name} </ModalTitle>
            <hr/>
            <p>Posti occupati: {room.occupied_seats}/{room.total_seats}</p>
            <p>{room.lesson_name} dalle {room.start} alle {room.end}</p>
            <p>Docente: {room.teacher}</p>
            <Button className={"prenote-class"}>Prenota Aula</Button>
        </Popup>
    )
}

export default DefaultPopUp;
