import React, {useEffect, useState} from "react";
import AppBarTitle from "./AppBarTitle";
import TeacherService from "../services/TeacherService";
import getUser from "../services/UserLocalInfoGetter";
import {Button, Divider, Form, Input, Space} from "antd";
import {useHistory} from "react-router-dom";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const CourseTable: React.FC = () => {

    const [values, setValues] = useState([])
    const [form] = Form.useForm();
    const history = useHistory();

    useEffect(() => {
        TeacherService.getCourses(getUser().email).then(
            (res) => setValues(res.data.map((v: { course_id: string; }) => v.course_id))
        )
    }, [])

    const onFinish = (v: any) => {
        v.newCourses.forEach((course: any) => {
            setValues(prevState => prevState.concat(course.course))
            // TeacherService.addCourse(course.course, getUser().email).then(
            //     (res) => console.log(res)
            // )
        })
        form.resetFields()
    }

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
                            name="courseTable"
                            style={{margin: '5% 0'}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.List name="old-courses">
                                {() => (
                                    values.map((v, index) => (
                                        <Form.Item key={index} noStyle>
                                            {index >= 1 ? (<Divider/>) : null}
                                            <Form.Item label={v}>
                                                <Button
                                                    type="default"
                                                    htmlType="button"
                                                    onClick={() => {}}
                                                >
                                                    Modifica lezioni
                                                </Button>
                                                <Button
                                                    style={{marginTop: "5pt"}}
                                                    type="primary"
                                                    htmlType="button"
                                                    onClick={() => setValues(values.filter((v,i) => i != index))}
                                                    danger
                                                >
                                                    Elimina corso
                                                </Button>
                                            </Form.Item>
                                        </Form.Item>
                                    ))
                                )}
                            </Form.List>
                            <Form.List name="newCourses">
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map(({key, name}) => (
                                            <Form.Item key={key} noStyle>
                                                {name >= 1 || values.length > 0? (<Divider/>) : null}
                                                <Space align="baseline">
                                                    <Form.Item
                                                        style={{marginBottom: "0"}}
                                                        label="Nome del corso"
                                                        name={[name, 'course']}
                                                        rules={[{ required: true, message: "Inserisci il corso" }]}
                                                    >
                                                        <Input type={"text"}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(name)}
                                                    />
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
                                                Aggiungi un corso
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

export default CourseTable;