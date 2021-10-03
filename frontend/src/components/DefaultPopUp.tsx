import React, {useState} from "react";
import {ModalTitle} from "react-bootstrap";
import {Room} from "../Model";
import {Popup} from "react-leaflet";
import * as util from "../utils/utils"
import {Button} from "antd";
require("../styles/pop_up/popUpStyle.scss")

interface Props {
    room: Room,
    offset: [number, number]
}

const DefaultPopUp: React.FC<Props> = (props:Props) => {

    const [isTeacherHidden, setIsTeacherHidden] = useState(true);
    const phone = props.room.adding_info && props.room.adding_info.phone_number ? props.room.adding_info.phone_number : ""
    const opening = props.room.adding_info && props.room.adding_info.opening_hour ? props.room.adding_info.opening_hour : null
    const closing = props.room.adding_info && props.room.adding_info.closing_hour ? props.room.adding_info.closing_hour : null

    function timeToString(time: any): string[] {
        let timeString: string[] = [];
        if (time) {
            const hour:string = time.hours < 10 ? "0" + time.hours : "" + time.hours
            const minutes:string = time.minutes < 10 ? "0" + time.minutes : "" + time.minutes
            timeString = [hour, minutes]
        }
        return timeString;
    }

    let openingToString:string[] = timeToString(opening)
    let closingToString:string[] = timeToString(closing)

    return (
        <Popup offset={props.offset}>
            <ModalTitle> {props.room.name} </ModalTitle>
            <hr/>
            <p>- Posti occupati: {props.room.occupied_seats}/{props.room.maximum_seats}</p>
            {props.room.type === "Aula" ?
                <div className={"classroom-infos " + (isTeacherHidden ? "" : "margin-bottom")}>
                    <p>-Lezione dalle xxx alle xxx</p>
                    <p><a onClick={() => setIsTeacherHidden(prevState => !prevState)}>- Docente: xxx</a></p>
                    <div className={isTeacherHidden ? "sub-info-hidden" : "sub-info-visible"}>
                        <p>- vittorio.ghini@email.com<br/>tel:3328934523</p>
                        <p>- Ricevimento:<br/>Lun 10:00/11:00<br/>Gio 14:30/16:00</p>
                    </div>
                </div> : null
            }
            {props.room.adding_info ?
                <div>
                    {phone != "" ? <p>-Telefono: {phone}</p>:null}
                    {openingToString != [] ?
                        <p>- Apertura ore: {openingToString[0]}:{openingToString[1]}</p>:null}
                    {closingToString != [] ?
                        <p>- Chiusura ore: {closingToString[0]}:{closingToString[1]}</p>:null}
                </div> : null
            }
            <Button className={"prenote-class"}>Prenota Aula</Button>
        </Popup>
    );
}

export default DefaultPopUp;
