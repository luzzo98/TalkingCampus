import React, {createRef, FormEvent, Ref, useReducer, useRef, useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Form, Input, Select} from "antd";
import * as utils from "../utils/utils"
import {Room} from "../Model";
require("../styles/pop_up/editPopUpStyle.scss")

interface props  {
    elem: Room
    onSubmit?: () => void
    onDelete: () => void
}

interface PopFormState {
    type: string
    seats: number
    name: string
}

const EditPopUp: React.FC<props> = ({elem, onDelete, onSubmit}) => {

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
                setFormState({type: value})
                break;
            case "seats":
                elem.maximum_seats = value
                setFormState({seats: value})
                break;
            case "name":
                elem.name = value
                setFormState({name: value})
        }
    }

    function generateOptions(): JSX.Element[]{
        const icons = []
        for (let roomType in utils.locals) {
            icons.push(<Select.Option value={roomType}>{roomType}</Select.Option>)
        }
        return icons
    }

    function handleDelete(){
        utils.closePopup(popupRef, closeButtonIndex)
        setTimeout(() => {
            onDelete()
        }, 10)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        if(formState.name !== "" && formState.type !== "" && formState.seats !== ""){
            utils.closePopup(popupRef, closeButtonIndex)
            if (onSubmit)
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
                <Form.Item
                    label="Stanza"
                    name="stanza"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Select
                        defaultValue={formState.type}
                        onSelect={(value => handleChangeSelect(value, 'room'))}>{generateOptions()}</Select>
                </Form.Item>
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Input defaultValue={formState.name} onChange={(value => handleChangeSelect(value.target.value, 'name'))}/>
                </Form.Item>
                <Form.Item
                    label="Posti"
                    name="posti"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Input defaultValue={formState.seats} onChange={(value) => handleChangeSelect(value.target.value, 'seats')}/>
                </Form.Item>
                <hr/>
                <div className={"ant-row div-buttons-popup"}>
                    <Button className={"popup-buttons"} onClick={handleDelete}>Annulla</Button>
                    <Button className={"popup-buttons"}
                            htmlType="submit"
                            id={"crea-marker"}>Crea</Button>
                </div>
            </Form>
        </Popup>
    )
}

export default EditPopUp;
