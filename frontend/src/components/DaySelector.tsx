import React, {useState} from "react";
import {Button, Divider, Form, Input, Select, Space} from "antd";
import {useHistory} from "react-router-dom";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
const { Option } = Select;
require("../styles/initialForm/initialFormStyle.scss")

interface Props {
    professorId?: string,
    courseId?: string,
    hours?: {
        start: string,
        end: string,
        day: 'lunedi' | 'martedi' | 'mercoledi' | 'giovedi' | 'venerdi',
        room: string
    }[]
}

const DaySelector: React.FC<Props> = ({professorId, courseId, hours}) => {

    const rooms = ['Aula 3.3', 'Aula 3.4', 'Lab. Vela']
    
    const [values, setValues] = useState(hours === undefined ? [] : hours)

    const history = useHistory();

    const [form] = Form.useForm();

    const onFinish = (v: any) => {
        console.log('Success:', v.orario == null ? values : values.concat(v.orario));
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
                            style={{margin: '5% 0', scrollMargin: 'initial'}}
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
                                                    initialValue={v.start}
                                                    rules={[{ required: true, message: "Inserisci l'ora di inizio" }]}
                                                >
                                                    <Input className={"hour"} type={"time"}/>
                                                </Form.Item>
                                                <Form.Item
                                                    labelCol={{span: 11}}
                                                    wrapperCol={{span: 13}}
                                                    label="Ora fine"
                                                    name={[index, 'end']}
                                                    initialValue={v.end}
                                                    rules={[{ required: true, message: "Inserisci l'ora di fine" }]}
                                                >
                                                    <Input className={"hour"} type={"time"}/>
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => {setValues(values.filter((_, i) => i !== index))}}
                                                />
                                            </Space>
                                            <Space className="hour-line">
                                                <Form.Item
                                                    name={[index, 'day']}
                                                    initialValue={v.day}
                                                    rules={[{ required: true, message: 'Seleziona il giorno' }]}
                                                >
                                                    <Select placeholder="Seleziona il giorno">
                                                        <Option value="lunedi">Lunedì</Option>
                                                        <Option value="martedi">Martedì</Option>
                                                        <Option value="mercoledi">Mercoledì</Option>
                                                        <Option value="giovedi">Giovedì</Option>
                                                        <Option value="venerdi">Venerdì</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name={[index, 'room']}
                                                    initialValue={v.room}
                                                    rules={[{ required: true, message: "Seleziona l'aula" }]}
                                                >
                                                    <Select placeholder="Seleziona l'aula">
                                                        {rooms.map(v => (
                                                            <Option key={v} value={v}>{v}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
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
                                                <Space className="hour-line" style={{ display: 'flex', width:'100%' }}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'day']}
                                                        fieldKey={[fieldKey, 'day']}
                                                        rules={[{ required: true, message: 'Seleziona il giorno' }]}
                                                    >
                                                        <Select placeholder="Seleziona il giorno">
                                                            <Option value="lunedi">Lunedì</Option>
                                                            <Option value="martedi">Martedì</Option>
                                                            <Option value="mercoledi">Mercoledì</Option>
                                                            <Option value="giovedi">Giovedì</Option>
                                                            <Option value="venerdi">Venerdì</Option>
                                                        </Select>
                                                    </Form.Item>
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
                                                </Space>
                                            </Form.Item>
                                        ))}
                                        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                            <Button
                                                className= "add-day"
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
                                    // onClick={() => history.goBack()}
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