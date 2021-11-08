import React, {createRef} from "react";
import {Popup} from "react-leaflet";
import {Button} from "antd";
import * as utils from "../utils/utils"
import PopUpService from "../services/PopUpService";
require("../styles/pop_up/popUpStyle.scss")
require("../styles/pop_up/deletePopupStyle.scss")

interface Props {
    room_id: string,
    offset: [number, number],
    onDelete: () => void
}

const popupRef = createRef<L.Popup>()

async function handleClose(id: string){
    return PopUpService.deleteRoom(id)
}

const DeletePopUp: React.FC<Props> = (props: Props) => {

    async function handleDelete(id: string){
        const statusIsOk = await handleClose(id)
        if(statusIsOk){
            utils.closePopup(popupRef)
            props.onDelete();
        }
    }

    return (
        <Popup
            ref={popupRef}
            offset={props.offset}>
            <p>Vuoi eliminare {props.room_id}?</p>
            <div className={"pop-up-buttons"}>
                <Button className={"choice-button"} onClick={() => utils.closePopup(popupRef)}>No</Button>
                <Button className={"choice-button"} onClick={() => handleDelete(props.room_id)}>Si</Button></div>
        </Popup>
    )
}

export default DeletePopUp;
