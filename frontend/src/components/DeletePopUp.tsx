import React from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
import * as utils from "../utils/utils"
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
}

const DeletePopUp: React.FC<Props> = ({room_id}) => {
    return (
        <Popup offset={utils.getOffset()}>
            <p>Vuoi eliminare {room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"}>No</Button>
                <Button className={"choice-button"}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
