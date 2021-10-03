import React, {createRef, FormEvent, useReducer, useRef} from "react";
import {Popup} from "react-leaflet";
import {Button, Form, Input, Select} from "antd";
import * as utils from "../utils/utils"
import {Room} from "../Model";
import {forEach} from "react-bootstrap/ElementChildren";
require("../styles/pop_up/editPopUpStyle.scss")

interface props  {
    elem: Room,
    buttonText: string,
    onSubmit: () => void
    onDelete: () => void
}

interface PopFormState {
    type: string
    seats: number
    name: string
}

async function addRoom(newRoom: Room){
    return fetch("http://localhost:80/api/add-room", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newRoom)
    }).then(response => response.ok)
}

const EditPopUp: React.FC<props> = ({elem, buttonText, onDelete, onSubmit}) => {

    const initState: PopFormState = {
        type: elem.type,
        seats: elem.maximum_seats,
        name: elem.name
    }
    const [formState, setFormState] = useReducer(utils.reducer, initState)
    const popupRef = createRef<L.Popup>()
    const closeButtonIndex: number = 2

    function handleChangeSelect(value: any, param: string) {
        switch (param) {
            case "room":
                elem.type = value
                const name: string = value + " " + elem.name
                elem.name = name
                setFormState({type: value, name: name})
                break;
            case "seats":
                elem.maximum_seats = value
                setFormState({seats: value})
                break;
        }
    }

    function generateOptions(): JSX.Element[]{
        return Array.from(utils.locals.keys()).map(e => <Select.Option value={e}>{e}</Select.Option>)
    }

    function handleDelete(){
        utils.closePopup(popupRef, closeButtonIndex)
        setTimeout(() => {
            onDelete()
        }, 10)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        if(formState.name !== "" && formState.type !== "" && formState.seats !== ""){
            utils.closePopup(popupRef, closeButtonIndex)
            const isOk = await addRoom(elem)
            if (isOk)
                onSubmit()
        }
        else
            console.log("bad submit")
    }

    return (
        <Popup offset={utils.getOffset()}
               closeOnClick={false}
               closeButton={true}
               ref={popupRef}
        >
            <Form onSubmitCapture={(e) => handleSubmit(e)}>
                <Form.Item label="Stanza" name="stanza" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Select optionLabelProp={"Stanza"} onSelect={(value => handleChangeSelect(value, 'room'))}>{generateOptions()}</Select>
                </Form.Item>
                <Form.Item label="Nome" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Input disabled={true} value={formState.name}/>
                </Form.Item>
                <Form.Item label="Posti" name="posti" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Input onChange={(value) => handleChangeSelect(value.target.value, 'seats')}/>
                </Form.Item>
                <hr/>
                <div className={"ant-row div-buttons-popup"}>
                    <Button className={"popup-buttons"} onClick={handleDelete}>Annulla</Button>
                    <Button className={"popup-buttons"}
                            htmlType="submit"
                            id={"crea-marker"}>{buttonText}</Button>
                </div>
            </Form>
        </Popup>
    )
}

export default EditPopUp;
