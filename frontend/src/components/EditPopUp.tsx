import React, {createRef, FormEvent, useReducer, useRef, useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Form, Input, Select} from "antd";
import * as utils from "../utils/utils"
import {Room} from "../Model";
require("../styles/pop_up/editPopUpStyle.scss")

interface props  {
    elem: Room,
    yetExistent?: boolean,
    buttonText: string,
    offset: [number, number],
    onSubmit: () => void
    onDelete: () => void
}

interface PopFormState {
    type: string
    seats: number
    name: string
}

interface AddingInfo {
    phone?: string
    opening_hour?: {
        hours: number,
        minutes: number
    }
    closing_hour?: {
        hours: number,
        minutes: number
    }
}

async function addRoom(newRoom: Room){
    return fetch("http://localhost:80/api/add-room", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newRoom)
    }).then(response =>  response.ok)
}

async function editRoom(){
    console.log("devi modificareeee");
    return false
}

const EditPopUp: React.FC<props> = (props: props) => {

    const initState: PopFormState = {
        type: props.elem.type,
        seats: props.elem.maximum_seats,
        name: props.elem.name
    }

    const addingInfoInit: AddingInfo = props.elem.adding_info ? props.elem.adding_info : {}

    const [formState, setFormState] = useReducer(utils.reducer, initState)
    const [addingInfo, setAddingInfo] = useReducer(utils.reducer, addingInfoInit)
    const composed_name = props.elem.name.split(" ")
    const [initialName] = useState(composed_name[composed_name.length-1])
    const popupRef = createRef<L.Popup>()
    const closeButtonIndex: number = 2

    function handleChangeSelect(value: any, param: string) {
        switch (param) {
            case "room":
                props.elem.type = value;
                const name: string = value + " " + initialName
                props.elem.name = name;
                setFormState({type: value, name: name})
                break;
            case "name":
                props.elem.name = value;
                setFormState({name: value})
                break;
            case "seats":
                props.elem.maximum_seats = value
                setFormState({seats: value})
                break;
        }
    }

    function handleAddingInfoChanges(value: any, param: string){
        const info = (param === "opening" || param === "closing") ? (value as string).split(":") : value
        switch (param){
            case "phone":
                setAddingInfo({phone: info})
                break;
            case "opening":
                setAddingInfo({opening_hour: {
                    hours: Number(info[0]),
                    minutes: Number(info[1])
                    }})
                break;
            case "closing":
                setAddingInfo({closing_hour: {
                        hours: Number(info[0]),
                        minutes: Number(info[1])
                    }})
                break;
        }
        props.elem.adding_info = addingInfo
    }

    function generateOptions(): JSX.Element[]{
        return Array.from(utils.locals.keys()).map(e => <Select.Option value={e}>{e}</Select.Option>)
    }

    function handleDelete(){
        utils.closePopup(popupRef, closeButtonIndex)
        setTimeout(() => {
            props.onDelete()
        }, 10)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        if(formState.name !== "" && formState.type !== "" && formState.seats !== ""){
            utils.closePopup(popupRef, closeButtonIndex)
            const submitIsOk = props.yetExistent ? await editRoom() : await addRoom(props.elem)
            if (submitIsOk) {
                props.onSubmit()
            }
        }
        else
            console.log("bad submit")
    }

    return (
        <Popup offset={props.offset}
               closeOnClick={false}
               closeButton={true}
               ref={popupRef}
        >
            <Form onSubmitCapture={(e) => handleSubmit(e)}>
                <Form.Item label="Stanza" name="stanza" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Select defaultValue={formState.type} optionLabelProp={"Stanza"} onSelect={(value => handleChangeSelect(value, 'room'))}>{generateOptions()}</Select>
                </Form.Item>
                <Form.Item className={"notRuledField"} label="Nome" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Input
                        onChange={(value) => props.yetExistent ? handleChangeSelect(value.target.value, 'name'):null}
                        disabled={!props.yetExistent}
                        value={formState.name}/>
                </Form.Item>
                <Form.Item label="Posti" name="posti" rules={[{ required: true, message:"parametro richiesto!!!"}]}>
                    <Input defaultValue={formState.seats} onChange={(value) => handleChangeSelect(value.target.value, 'seats')}/>
                </Form.Item>
                <Input.Group className={"extra-group"} size={"small"}>
                    <h3>"Extra info."</h3>
                    <Form.Item className={"notRuledField"} name="Cel" label="Cel." >
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'phone')} type={"tel"} placeholder={"+39"}/>
                    </Form.Item>
                    <Form.Item className={"notRuledField"} name="Open" label="Apre:">
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'opening')} placeholder={"format \"00:00\""}/>
                    </Form.Item>
                    <Form.Item className={"notRuledField"} name="Close" label="Chiude:" >
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'closing')} placeholder={"format \"00:00\""}/>
                    </Form.Item>
                </Input.Group>
                <hr/>
                <div className={"ant-row div-buttons-popup"}>
                    <Button className={"popup-buttons"} onClick={handleDelete}>Annulla</Button>
                    <Button className={"popup-buttons"}
                            htmlType="submit"
                            id={"crea-marker"}>{props.buttonText}</Button>
                </div>
            </Form>
        </Popup>
    )
}

export default EditPopUp;
