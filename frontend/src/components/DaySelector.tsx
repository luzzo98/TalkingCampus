import React, {useEffect, useState} from "react";
import {Button, Divider, Form, Input, Modal, Select, Space} from "antd";
import {useHistory} from "react-router-dom";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import getUser from "../services/UserLocalInfoGetter";
import TeacherService from "../services/TeacherService";
const { Option } = Select;
require("../styles/initialForm/initialFormStyle.scss")

const DaySelector: React.FC = () => {

    const receptions: {
        start: { hours: string, minutes: string },
        end:   { hours: string, minutes: string },
        day: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì',
        room?: string
    }[] = []
    const [values, setValues] = useState(receptions)
    const history = useHistory();
    const [form] = Form.useForm();

    const rooms: string[] = []
    useEffect(() => {
        if (getUser().role === "teacher") {
            TeacherService.getReceptions(getUser().email).then(
                (res) => setValues(res.data))
        } else {
            TeacherService.getLessonsRooms().then(
                (res) => res.data.forEach((v: any) => rooms.push(v.name))) //TODO non funziona? nel ricevimento non serve
        }
    }, [])

    const onFinish = (v: any) => {
        if (v.orario) {
            v.orario.forEach((r: { day: string; start: string; end: string; }) => {
                TeacherService.addReception(getUser().email, r.day, r.start, r.end).then(
                    res => {
                        if (res.data.code === 11000) {
                            Modal.error({
                                title: 'Impossibile aggiungere il ricevimento',
                                content: `Errore durante l'inserimento del ricevimento nel sistema`
                            });
                        } else {
                            history.goBack()
                        }
                    },
                    () => Modal.error({
                        title: 'Errore di rete',
                        content: 'La comunicazione al server è fallita, controllare la connessione e riprovare',
                    })
                )
            })
        } else {
            history.goBack()
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className={'initialForm'}>
            <div className="card-container">
                <div className="hours-container">
                    <AppBarTitle/>
                    <div className="day-selector">
                        <Form
                            form={form}
                            name="daySelector"
                            style={{margin: '5% 0'}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.List name="vecchio-orario">
                                {() => (
                                    values.map((v, index) => (
                                        <Form.Item key={index} noStyle>
                                            {index >= 1 ? (<Divider/>) : null}
                                            <Space align="baseline">
                                                <Form.Item
                                                    labelCol={{span: 11}}
                                                    wrapperCol={{span: 13}}
                                                    label="Ora inizio"
                                                    name={[index, 'start']}
                                                    initialValue={v.start.hours + ":" + (v.start.minutes.toString().length === 1 ? "0"+v.start.minutes : v.start.minutes)}
                                                    rules={[{ required: true, message: "Inserisci l'ora di inizio" }]}
                                                >
                                                    <Input className={"hour"} type={"time"} disabled={true}/>
                                                </Form.Item>
                                                <Form.Item
                                                    labelCol={{span: 11}}
                                                    wrapperCol={{span: 13}}
                                                    label="Ora fine"
                                                    name={[index, 'end']}
                                                    initialValue={v.end.hours + ":" + (v.end.minutes.toString().length === 1 ? "0"+v.end.minutes : v.end.minutes)}
                                                    rules={[{ required: true, message: "Inserisci l'ora di fine" }]}
                                                >
                                                    <Input className={"hour"} type={"time"} disabled={true}/>
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => {
                                                        TeacherService.deleteReception(getUser().email, values[index].day, values[index].start, values[index].end)
                                                        setValues(values.filter((_, i) => i !== index))
                                                    }}
                                                />
                                            </Space>
                                            <Space className="hour-line"
                                                   style={ getUser().role === "teacher" ? { justifyContent: 'center' } : {}}>
                                                <Form.Item
                                                    name={[index, 'day']}
                                                    initialValue={v.day}
                                                    rules={[{ required: true, message: 'Seleziona il giorno' }]}
                                                >
                                                    <Select placeholder="Seleziona il giorno" disabled={true}>
                                                        <Option value="Lunedì">Lunedì</Option>
                                                        <Option value="Martedì">Martedì</Option>
                                                        <Option value="Mercoledì">Mercoledì</Option>
                                                        <Option value="Giovedì">Giovedì</Option>
                                                        <Option value="Venerdì">Venerdì</Option>
                                                    </Select>
                                                </Form.Item>
                                                {getUser().role === "student" ?
                                                    <Form.Item
                                                        name={[index, 'room']}
                                                        initialValue={v.room}
                                                        rules={[{ required: true, message: "Seleziona l'aula" }]}
                                                    >
                                                        <Select placeholder="Seleziona l'aula" disabled={true}>
                                                            {rooms.map(v => (
                                                                <Option key={v} value={v}>{v}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    : ""
                                                }
                                            </Space>
                                        </Form.Item>
                                    ))
                                )}
                            </Form.List>

                            <Form.List name="orario">
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Form.Item key={key} noStyle>
                                                {name >= 1 || values.length > 0? (<Divider/>) : null}
                                                <Space align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        labelCol={{span: 11}}
                                                        wrapperCol={{span: 13}}
                                                        label="Ora inizio"
                                                        name={[name, 'start']}
                                                        fieldKey={[fieldKey, 'start']}
                                                        rules={[{ required: true, message: "Inserisci l'ora di inizio" }]}
                                                    >
                                                        <Input className={"hour"} type={"time"}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        labelCol={{span: 11}}
                                                        wrapperCol={{span: 13}}
                                                        label="Ora fine"
                                                        name={[name, 'end']}
                                                        fieldKey={[fieldKey, 'end']}
                                                        rules={[{ required: true, message: "Inserisci l'ora di fine" }]}
                                                    >
                                                        <Input className={"hour"} type={"time"}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(name)}
                                                    />
                                                </Space>
                                                <Space className="hour-line"
                                                       style={ getUser().role === "teacher" ? { justifyContent: 'center' } : {}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'day']}
                                                        fieldKey={[fieldKey, 'day']}
                                                        rules={[{ required: true, message: 'Seleziona il giorno' }]}
                                                    >
                                                        <Select placeholder="Seleziona il giorno">
                                                            <Option value="Lunedì">Lunedì</Option>
                                                            <Option value="Martedì">Martedì</Option>
                                                            <Option value="Mercoledì">Mercoledì</Option>
                                                            <Option value="Giovedì">Giovedì</Option>
                                                            <Option value="Venerdì">Venerdì</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    {getUser().role === "student" ?
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'room']}
                                                            fieldKey={[fieldKey, 'room']}
                                                            rules={[{ required: true, message: "Seleziona l'aula" }]}
                                                        >
                                                            <Select placeholder="Seleziona l'aula">
                                                                {rooms.map(v => (
                                                                    <Option key={v} value={v}>{v}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                        : ""
                                                    }
                                                </Space>
                                            </Form.Item>
                                        ))}
                                        <Divider/>
                                        <Form.Item style={{marginTop: "15pt"}} wrapperCol={{ offset: 0, span: 24 }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                            >
                                                Aggiungi un giorno
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <Space className={'button-space'}>
                                <Button
                                    type="default"
                                    htmlType="button"
                                    onClick={() => history.goBack()}
                                >
                                    Annulla
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Conferma
                                </Button>
                            </Space>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DaySelector;