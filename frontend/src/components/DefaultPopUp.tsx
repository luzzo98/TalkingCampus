import React, {useState} from "react";
import {ModalTitle} from "react-bootstrap";
import {Room} from "../Model";
import {Popup} from "react-leaflet";
import * as util from "../utils/utils"
import {Button} from "antd";
require("../styles/pop_up/popUpStyle.scss")

interface Props {
    room: Room,
}

const DefaultPopUp: React.FC<Props> = ({room}) => {

    const [isTeacherHidden, setIsTeacherHidden] = useState(true)

    return (
        <Popup offset={util.getOffset()}>
            <ModalTitle> {room.type} </ModalTitle>
            <hr/>
            <p>- Posti occupati: {room.occupied_seats}/{room.total_seats}</p>
            {room.type === "Aula" ?
                <div className={"classroom-infos " + (isTeacherHidden ? "" : "margin-bottom")}>
                    <p>- {room.lesson_name} dalle {room.start} alle {room.end}</p>
                    <p><a onClick={() => setIsTeacherHidden(prevState => !prevState)}>- Docente: {room.teacher}</a></p>
                    <div className={isTeacherHidden ? "sub-info-hidden" : "sub-info-visible"}>
                        <p>- vittorio.ghini@email.com<br/>tel:3328934523</p>
                        <p>- Ricevimento:<br/>Lun 10:00/11:00<br/>Gio 14:30/16:00</p>
                    </div>
                    <Button className={"prenote-class"}>Prenota Aula</Button>
                </div> : null
            }
        </Popup>
    )
}

export default DefaultPopUp;
