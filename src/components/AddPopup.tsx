import React, {useReducer, useRef, useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Form, Input, Select} from "antd";
import * as utils from "../utils/utils"
require("../styles/pop_up/addPopUpStyle.scss")

interface props  {
    offset: [number, number]
    onElementAdd: () => void
    onRoomTypeDefined: (type:string) => void
}

interface PopFormState {
    roomType: string
    seats: string
    name: string
}

const AddPopUp: React.FC<props> = ({offset, onElementAdd, onRoomTypeDefined}) => {

    const initState = {
        roomType: "",
        seats: "",
        name: ""
    }
    const [formState, setFormState] = useReducer(utils.reducer, initState)
    const [isButtonCloseVisible, setIsButtonCloseVisible] = useState(false)

    function handleChangeSelect(value: any, param: string) {
        switch (param) {
            case "room":
                onRoomTypeDefined(value)
                setFormState({roomType: value})
                break;
            case "seats":
                setFormState({seats: value})
                break;
            case "name":
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

    function handleSubmit(){
        const state = formState as PopFormState
        if(state.name !== "" && state.roomType !== "" && state.seats !== ""){
            setIsButtonCloseVisible(flag => !flag);
            (utils.getElementOnViewByClass("leaflet-popup-close-button")[0] as HTMLElement).click()
            setTimeout(onElementAdd, 10)
        }
        else
            console.log("shit submit")
    }

    return (
        <Popup offset={offset}
               closeOnClick={false}
               closeButton={true}
        >
            <Form onSubmitCapture={() => handleSubmit()}>
                <Form.Item
                    label="Stanza:"
                    name="stanza"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Select
                        onSelect={(value => handleChangeSelect(value, 'room'))}>{generateOptions()}</Select>
                </Form.Item>
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Input onChange={(value => handleChangeSelect(value.target.value, 'name'))}/>
                </Form.Item>
                <Form.Item
                    label="Posti"
                    name="posti"
                    rules={[{ required: true, message:"parametro richiesto!!!"}]}
                >
                    <Input onChange={(value) => handleChangeSelect(value.target.value, 'seats')}/>
                </Form.Item>
                <hr/>
                <div className={"ant-row div-buttons-popup"}>
                    <Button className={"popup-buttons"}>Annulla</Button>
                    <Button className={"popup-buttons"}
                            htmlType="submit"
                            id={"crea-marker"}>Crea</Button>
                </div>
            </Form>
        </Popup>
    )
}

export default AddPopUp;
