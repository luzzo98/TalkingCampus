import React from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
    offset: [number, number]
}

const DeletePopUp: React.FC<Props> = ({room_id, offset}) => {
    return (
        <Popup offset={offset}>
            <p>Sei sicuro di volere eliminare {room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"}>No</Button>
                <Button className={"choice-button"}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
