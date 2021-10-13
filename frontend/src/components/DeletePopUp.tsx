import React, {createRef} from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
import * as utils from "../utils/utils"
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
    offset: [number, number],
    onDelete: () => void
}

const popupRef = createRef<L.Popup>()
const closeButtonIndex: number = 2;

async function handleClose(id: string){
    return fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/remove-room/${id}`)
        .then(response => response.ok)
}

const DeletePopUp: React.FC<Props> = (props: Props) => {

    async function handleDelete(id: string){
        const statusIsOk = await handleClose(id)
        if(statusIsOk){
            utils.closePopup(popupRef, closeButtonIndex)
            props.onDelete();
        }
    }

    return (
        <Popup
            ref={popupRef}
            offset={props.offset}>
            <p>Vuoi eliminare {props.room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"} onClick={() => utils.closePopup(popupRef, closeButtonIndex)}>No</Button>
                <Button className={"choice-button"} onClick={() => handleDelete(props.room_id)}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
