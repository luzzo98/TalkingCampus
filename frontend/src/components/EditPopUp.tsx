import React, {createRef, FormEvent, useEffect, useReducer, useRef, useState} from "react";
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
    maximum_seats: number
    name: string
    adding_info?: AddingInfo
}

interface Notes {
    title: string,
    content: string
}

interface AddingInfo {
    phone_number?: string
    opening_hour?: {
        hours: number,
        minutes: number
    }
    closing_hour?: {
        hours: number,
        minutes: number
    }
    notes?: Notes
}

async function addRoom(newRoom: Room){
    return fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/add-room`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newRoom)
    }).then(response => response.ok)
}

async function editRoom(update: any, id: string){
    console.log(JSON.stringify(update))
    return fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/edit-room/${id}`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(update)
    }).then(response => {console.log(response); return response})
        .then(response => response.ok)
}

const EditPopUp: React.FC<props> = (props: props) => {

    function defUpdate(init: any, last: any){
        return Object.entries(last).filter(e => (init as any)[e[0]] !== e[1])
    }

    function combineUpdate(){
        const update:{[id: string] : any} = {}
        update['adding_info'] = {}
        defUpdate(initState, formState).forEach(e => update[e[0]] = e[1])
        defUpdate(addingInfoInit, addingInfo).forEach(e => update['adding_info'][e[0]] = e[1])
        console.log(update)
        return update;
    }

    const [initState] = useState<PopFormState>({
        type: props.elem.type,
        maximum_seats: props.elem.maximum_seats,
        name: props.elem.name
    })
    const [addingInfoInit] = useState<AddingInfo>(props.elem.adding_info ? props.elem.adding_info : {})
    const [formState, setFormState] = useReducer(utils.reducer, initState)
    const [addingInfo, setAddingInfo] = useReducer(utils.reducer, addingInfoInit)
    const [notes, setNotes] = useReducer(utils.reducer, addingInfoInit.notes? addingInfoInit.notes : {})
    const composed_name = props.elem.name.split(" ")
    const [initialName] = useState(composed_name[composed_name.length-1])
    const popupRef = createRef<L.Popup>()
    const closeButtonIndex: number = 2

    useEffect(() => {
        if(notes.title && notes.content)
            setAddingInfo({notes:notes})
    }, [notes])

    useEffect(() => {
        props.elem.adding_info = addingInfo
    }, [addingInfo])

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
                setFormState({maximum_seats: value})
                break;
        }
    }

    function handleAddingInfoChanges(value: any, param: string){
        const info = (param === "opening" || param === "closing") ? (value as string).split(":") : value
        switch (param){
            case "phone":
                setAddingInfo({phone_number: value})
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
            case "title":
                setNotes({title: value})
                break;
            case "content":
                setNotes({content: value})
                break;
        }
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
        if(formState.name !== "" && formState.type !== "" && formState.maximum_seats !== ""){
            utils.closePopup(popupRef, closeButtonIndex)
            const submitIsOk = props.yetExistent ? await editRoom(combineUpdate(), props.elem.id as string) : await addRoom(props.elem)
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
                    <Input defaultValue={formState.maximum_seats} onChange={(value) => handleChangeSelect(value.target.value, 'seats')}/>
                </Form.Item>
                {(!props.yetExistent || Object.keys(props.elem.adding_info as {}).length > 0) ?
                <Input.Group className={"extra-group"} size={"small"}>
                    <h3>"Extra info."</h3>
                    { (!props.yetExistent || props.elem.adding_info?.phone_number) ?
                    <Form.Item className={"notRuledField"} name="Cel" label="Cel." >
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'phone')} type={"tel"}
                               defaultValue={!props.yetExistent ? "" : props.elem.adding_info?.phone_number}
                               placeholder={"+39"}/>
                    </Form.Item>:null}
                    { (!props.yetExistent || props.elem.adding_info?.opening_hour) ?
                    <Form.Item className={"notRuledField"} name="Open" label="Apre:">
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'opening')}
                               defaultValue={!props.yetExistent ? "" : utils.getCorrectFormat(
                                   props.elem.adding_info?.opening_hour as {hours: number, minutes: number})}
                               placeholder={"format \"00:00\""}/>
                    </Form.Item>:null}
                    { (!props.yetExistent || props.elem.adding_info?.closing_hour) ?
                    <Form.Item className={"notRuledField"} name="Close" label="Chiude:" >
                        <Input onChange={(value) =>
                            handleAddingInfoChanges(value.target.value, 'closing')}
                               placeholder={"format \"00:00\""}
                               defaultValue={!props.yetExistent ? "" :
                                   utils.getCorrectFormat(props.elem.adding_info?.closing_hour as {hours: number, minutes: number})}
                        />
                    </Form.Item>:null}
                </Input.Group> : null}
                { (!props.yetExistent || props.elem.adding_info?.notes) ?
                <Input.Group className={"extra-group"} size={"small"}>
                    <h3>"Notes"</h3>
                    <Form.Item className={"notRuledField"} name="Title">
                        <Input
                            onChange={(value) =>
                                handleAddingInfoChanges(value.target.value, 'title')}
                            placeholder={"Title.."}
                            defaultValue={!props.yetExistent ? "" : props.elem.adding_info?.notes?.title}
                        />
                    </Form.Item>
                    <Form.Item className={"notRuledField"} name="Content">
                        <Input.TextArea
                            onChange={(value) =>
                                handleAddingInfoChanges(value.target.value, 'content')}
                            placeholder={"Content.."}
                            defaultValue={!props.yetExistent ? "" : props.elem.adding_info?.notes?.content}
                        />
                    </Form.Item>
                </Input.Group> : null }
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
};

export default EditPopUp;
