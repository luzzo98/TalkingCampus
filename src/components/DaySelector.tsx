import React, {useState} from "react";
import {Button, Divider, Form, Input, Select, Space} from "antd";
import {useHistory} from "react-router-dom";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
const { Option } = Select;

interface hoursArray {
    hours: {
        start: string,
        end: string,
        day: 'lunedi' | 'martedi' | 'mercoledi' | 'giovedi' | 'venerdi',
        room: string
    }[]
}

function DaySelector(props: hoursArray) {

    const rooms = ['Aula 3.3', 'Aula 3.4', 'Lab. Vela']
    
    const [values, setValues] = useState(props.hours)

    let prefill = false

    const history = useHistory();

    const [form] = Form.useForm();

    const onFinish = (v: any) => {
        console.log('Success:', v.orario == null ? values : values.concat(v.orario));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="card-container">
            <div className="day-selector">
                <Form
                    form={form}
                    name="basic"
                    style={{marginTop: '10%', scrollMargin: 'initial'}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.List name="vecchio-orario">
                        {() => (
                                values.map((v, index) => (
                                    <Form.Item key={index} noStyle>
                                        {prefill = true}
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
                                                <Input type={"time"}/>
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{span: 11}}
                                                wrapperCol={{span: 13}}
                                                label="Ora fine"
                                                name={[index, 'end']}
                                                initialValue={v.end}
                                                rules={[{ required: true, message: "Inserisci l'ora di fine" }]}
                                            >
                                                <Input type={"time"}/>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => {setValues(values.filter((_, i) => i !== index))}}
                                            />
                                        </Space>
                                        <Space className="hour-line" style={{ display: 'flex', width:'100%' }}>
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
                                        {key >= 1 || prefill? (<Divider/>) : null}
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
                                                <Input type={"time"}/>
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
                                                <Input type={"time"}/>
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
                                        Aggiungi un altro giorno
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <Button
                            className={'form-button'}
                            type="default"
                            htmlType="button"
                            onClick={() => history.goBack()}
                        >
                            Annulla
                        </Button>
                        <Button
                            className={'form-button'}
                            type="primary"
                            htmlType="submit"
                            // onClick={() => history.goBack()}
                        >
                            Conferma
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default DaySelector;