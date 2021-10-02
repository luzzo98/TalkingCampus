import React, {createRef} from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
import * as utils from "../utils/utils"
import {ok} from "assert";
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
    onDelete: () => void
}

const popupRef = createRef<L.Popup>()
const closeButtonIndex: number = 2;

async function handleClose(id: string){
    return fetch(`http://localhost:80/api/remove-room/${id}`)
        .then(response => response.ok ? utils.closePopup(popupRef, closeButtonIndex) : null)
}

const DeletePopUp: React.FC<Props> = ({room_id, onDelete}) => {

    async function handleDelete(id: string){
        await handleClose(id)
        onDelete();
    }

    return (
        <Popup
            ref={popupRef}
            offset={utils.getOffset()}>
            <p>Vuoi eliminare {room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"} onClick={() => utils.closePopup(popupRef, closeButtonIndex)}>No</Button>
                <Button className={"choice-button"} onClick={() => handleDelete(room_id)}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
