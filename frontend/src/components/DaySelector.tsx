import React, {useEffect, useState} from "react";
import {Button, Divider, Form, Input, Modal, Select, Space} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import getUser from "../services/UserLocalInfoGetter";
import TeacherService from "../services/TeacherService";
import SubAppBar from "./SubAppBar";
const { Option } = Select;
require("../styles/initialForm/initialFormStyle.scss")

const DaySelector: React.FC = () => {

    const location: any = useLocation();
    const name: string = location.state && location.state.course ? location.state.course : "Orario di ricevimento"
    const myType: {
        start: { hours: string, minutes: string },
        end:   { hours: string, minutes: string },
        day: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì',
        room?: string
    }[] = []
    const [values, setValues] = useState(myType)
    const [rooms, setRooms] = useState<string[]>([])
    const history = useHistory();
    const [form] = Form.useForm();

    useEffect(() => {
        if (location.state && location.state.course) {
            const r: string[] = []
            TeacherService.getLessonsRooms().then(
                (res) => res.data.forEach((v: { name: string; }) => r.push(v.name)))
            setRooms(r)

            TeacherService.getLessonsFromCourse(location.state.course).then(
                (res) => setValues(res.data))
        } else {
            TeacherService.getReceptions(getUser().email).then(
                (res) => setValues(res.data))
        }
    }, [])

    const onFinish = (v: any) => {
        if (v.orario) {
            v.orario.forEach((r: { day: string; start: string; end: string; room?: string }) => {
                if (location.state && location.state.course) {
                    TeacherService.addLesson(location.state.course, r.room || "", r.day, r.start, r.end).then(
                        res => {
                            if (res.data.code === 11000) {
                                Modal.error({
                                    title: 'Impossibile aggiungere il ricevimento',
                                    content: `Errore durante l'inserimento del ricevimento nel sistema`
                                });
                                return;
                            }
                        },
                        () => {
                            Modal.error({
                                title: 'Errore di rete',
                                content: 'La comunicazione al server è fallita, controllare la connessione e riprovare',
                            })
                            return;
                        }
                    )
                } else {
                    TeacherService.addReception(getUser().email, r.day, r.start, r.end).then(
                        res => {
                            if (res.data.code === 11000) {
                                Modal.error({
                                    title: 'Impossibile aggiungere il ricevimento',
                                    content: `Errore durante l'inserimento del ricevimento nel sistema`
                                });
                                return;
                            }
                        },
                        () => {
                            Modal.error({
                                title: 'Errore di rete',
                                content: 'La comunicazione al server è fallita, controllare la connessione e riprovare',
                            })
                            return;
                        }
                    )
                }
            })
        }
        history.goBack()
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className={'initialForm'}>
            <div className="card-container">
                <div className="hours-container">
                    <AppBarTitle/>
                    <SubAppBar sub_text={name}/>
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
                                                    initialValue={(v.start.hours.toString().length === 1 ? "0"+v.start.hours : v.start.hours)
                                                    + ":" + (v.start.minutes.toString().length === 1 ? "0"+v.start.minutes : v.start.minutes)}
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
                                                        if (v.room) {
                                                            TeacherService.deleteLessons(getUser().email, location.state.course, v.room || "", v.day, v.start, v.end)
                                                        } else {
                                                            TeacherService.deleteReception(getUser().email, v.day, v.start, v.end)
                                                        }
                                                        setValues(values.filter((_, i) => i !== index))
                                                    }}
                                                />
                                            </Space>
                                            <Space className="hour-line"
                                                   style={ !v.room ? { justifyContent: 'center' } : {}}>
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
                                                {v.room ?
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
                                                       style={ !location.state || !location.state.course ? { justifyContent: 'center' } : {}}>
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
                                                    {location.state && location.state.course ?
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