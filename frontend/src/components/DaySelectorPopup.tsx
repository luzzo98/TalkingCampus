import React from "react";
import {Button, Divider, Form, FormInstance, Input, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
const { Option } = Select;
require("../styles/initialForm/DaySelectorPopupStyle.scss")

interface Props {
    formName: string
    form: FormInstance
    value: any
    setValue: any
}

const DaySelectorPopup: React.FC<Props> = ({formName, form, value, setValue}) => {

    const rooms = ['Aula 3.3', 'Aula 3.4', 'Lab. Vela']

    const onFinish = (v: any) => {
        if (formName === "reception") {
            console.log("ricevimento:", v.orario);
            setValue(v.orario)
        } else {
            console.log("corso:", v.orario)
            setValue(new Map(value.set(formName, v.orario)));
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="day-selector">
            <Form
                form={form}
                name={formName}
                style={{marginTop: '10pt'}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.List name="orario">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                <Form.Item key={key} noStyle>
                                    {name >= 1 ? (<Divider/>) : null}
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
                                           style={ formName === "reception" ? { justifyContent: 'center' } : {}}>
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
                                        {formName === "reception" ? "" :
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
                                            </Form.Item>}
                                    </Space>
                                </Form.Item>
                            ))}
                            <Form.Item className= "add-day" wrapperCol={{ offset: 0, span: 24 }}>
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
            </Form>
        </div>
    );
}

export default DaySelectorPopup;