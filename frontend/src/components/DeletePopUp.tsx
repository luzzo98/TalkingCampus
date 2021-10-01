import React, {createRef} from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
import * as utils from "../utils/utils"
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
}

const popupRef = createRef<L.Popup>()
const closeButtonIndex: number = 2;

const DeletePopUp: React.FC<Props> = ({room_id}) => {
    return (
        <Popup
            ref={popupRef}
            offset={utils.getOffset()}>
            <p>Vuoi eliminare {room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"} onClick={() => utils.closePopup(popupRef, closeButtonIndex)}>No</Button>
                <Button className={"choice-button"}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
