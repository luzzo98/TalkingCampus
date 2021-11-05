import React, {useState} from "react";
import {Form, Input, Button, Tabs, Upload, Select, Divider, Modal} from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import {Route} from "react-router-dom";
import MainPage from "./MainPage";
import * as utils from "../utils/utils";
import AppBarTitle from "./AppBarTitle";
import DaySelectorModalForm from "./DaySelectorPopupModalForm"
import AuthService from "../services/AuthService";

require("../styles/initialForm/initialFormStyle.scss")

const { TabPane } = Tabs;
const { Option } = Select;

interface LessonType {
    room: string,
    start: string,
    end: string,
    day: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì'
}

interface ReceptionType {
    start: string,
    end: string,
    day: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì'
}

const InitialForm:React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [visibleClassSchedule, setVisibleClassSchedule] = useState(Array<boolean>());
    const [reception, setReception] = useState(Array<ReceptionType>())
    const [courseMap, setCourseMap] = useState(new Map())
    const history = useHistory();
    const [loginForm] = Form.useForm();
    const [studentForm] = Form.useForm();
    const [professorForm] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 15 },
            sm: { span: 9 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const addCourseLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 15, offset: 9 },
        },
    };

    const showConnectionError = () => Modal.error({
        title: 'Errore di rete',
        content: 'La comunicazione al server è fallita, controllare la connessione e riprovare',
    });

    const getLessons = (values: any): {name: string, timetable: LessonType[]}[] => {
        let courses: { name: string; timetable: any; }[] = []
        if (values && values.length > 0) {
            let i = courseMap.entries()
            values.forEach((v: any) => courses.push({
                name: v,
                timetable: i.next().value[1]
            }))
        }
        return courses
    }

    const onLoginFinish = (values: any) => {
        AuthService.login(values.email, values.password).then(
            (res) => {
                if (res)
                    history.push("/main-page", {user: res, hooks: utils.getElements(res)});
                else
                    Modal.error({
                        title: 'I dati inseriti non sono corretti',
                        content: 'Inserisci nuovamente la tua email e password',
                    });
            },
            () => showConnectionError()
        );
    }
    const onStudentFinish = (values: any) => {
        AuthService.registerStudent(values.nome, values.cognome, values.telefono, values.universita, values.matricola, values.email, values.password).then(
            res => {
                if (res.data.code === 11000) {
                    Modal.error({
                        title: 'Errore in fase di registrazione',
                        content: "L'email inserita è già stata utilizzata"
                    });
                } else {
                    Modal.success({
                        content: 'Registrazione effettuata con successo',
                        onOk() {
                            window.location.reload();
                        }
                    });
                }
            },
            () => showConnectionError()
        );
    }
    const onProfessorFinish = (values: any) => {
        AuthService.registerProfessor(values.nome, values.cognome, values.telefono, values.email, values.password)
            .then(
                res => {
                    if (res.data.code === 11000) {
                        Modal.error({
                            title: 'Errore in fase di registrazione',
                            content: "L'email inserita è già stata utilizzata"
                        });
                    } else {
                        Modal.success({
                            content: 'Registrazione effettuata con successo',
                            onOk() {
                                window.location.reload();
                            }
                        });

                        if (values.corso) {
                            values.corso.forEach((course: string) => {
                                AuthService.addCourse(course, values.email).then(
                                    res => {
                                        if (res.data.code == 11000) {
                                            Modal.error({
                                                title: 'Impossibile aggiungere il corso',
                                                content: `Il corso ${course} è già presente nel sistema`
                                            });
                                        }
                                    },
                                    () => showConnectionError()
                                );
                            })
                        }

                        if (reception) {
                            reception.forEach(r => {
                                AuthService.addReception(values.email, r.day, r.start, r.end).then(
                                    res => {
                                        if (res.data.code == 11000) {
                                            Modal.error({
                                                title: 'Impossibile aggiungere il ricevimento',
                                                content: `Errore durante l'inserimento del ricevimento nel sistema`
                                            });
                                        }
                                    },
                                    () => showConnectionError()
                                )
                            })
                        }

                        const lessons = getLessons(values.corso)
                        if (lessons) {
                            lessons.forEach(l => {
                                l.timetable.forEach(t => {
                                    AuthService.addLesson(l.name, t.room, t.day, t.start, t.end).then(
                                        res => {
                                            if (res.data.code == 11000) {
                                                Modal.error({
                                                    title: 'Impossibile aggiungere la lezione',
                                                    content: `Errore durante l'inserimento di una lezione nel sistema`
                                                });
                                            }
                                        }
                                    )
                                })
                            })
                        }
                    }
                },
                () => showConnectionError()
            );
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    return (
        <div className={'initialForm'}>
            <div className="card-container">
                <div>
                    <AppBarTitle/>
                    <Tabs type="card">
                        <TabPane tab="Login" key="1" className="tabpane-container">
                            <Form
                                form={loginForm}
                                name="basic"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                onFinish={onLoginFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    className="first-elem"
                                    name="email"
                                    label="Email"
                                    rules={[{
                                        type: 'email',
                                        message: 'Inserisci una mail valida',
                                    }, {
                                        required: true,
                                        message: 'Inserisci la tua email istituzionale'
                                    }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{required: true, message: 'Inserisci la tua password'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    className={'form-button'}
                                    wrapperCol={{offset: 0, span: 24}}
                                >
                                    <Button type="primary" htmlType="submit">Accedi</Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Registrazione studente" key="2" className="tabpane-container">
                            <Form
                                form={studentForm}
                                name="basic"
                                labelCol={{span: 9}}
                                wrapperCol={{span: 15}}
                                onFinish={onStudentFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    className="first-elem"
                                    label="Nome"
                                    name="nome"
                                    rules={[{required: true, message: 'Inserisci il tuo nome'}]}
                                >
                                    <Input pattern={"^[a-zA-Z]+$"}/>
                                </Form.Item>

                                <Form.Item
                                    label="Cognome"
                                    name="cognome"
                                    rules={[{required: true, message: 'Inserisci il tuo cognome'}]}
                                >
                                    <Input pattern={"^[a-zA-Z]+([ ]{1}[a-zA-Z]+){0,2}$"}/>
                                </Form.Item>

                                <Form.Item
                                    label="Telefono"
                                    name="telefono"
                                    rules={[{required: true, message: 'Inserisci il tuo numero di telefono', min: 10, max: 10}]}
                                >
                                    <Input type={"number"} min={0}/>
                                </Form.Item>

                                <Form.Item
                                    name="universita"
                                    label="Università"
                                    rules={[{required: true, message: 'Seleziona il tuo corso universitario'}]}
                                >
                                    <Select placeholder="Seleziona il tuo corso universitario">
                                        <Option value="economia">Economia e management</Option>
                                        <Option value="biomedica">Ingegneria biomedica</Option>
                                        <Option value="informatica">Ingegneria e scienze informatiche</Option>
                                        <Option value="elettronica">Ingegneria elettronica</Option>
                                        <Option value="veterinaria">Medicina veterinaria</Option>
                                        <Option value="psicologia">Psicologia</Option>
                                        <Option value="alimentari">Tecnologie alimentari</Option>
                                        <Option value="enologia">Viticoltura ed enologia</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Matricola"
                                    name="matricola"
                                    rules={[{required: true, message: 'Inserisci la tua matricola', min: 10, max: 10}]}
                                >
                                    <Input min={0} type={"number"}/>
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{type: 'email', message: 'Inserisci una mail valida'},
                                        {required: true, message: 'Inserisci la tua email istituzionale'}]}
                                >
                                    <Input pattern={"^[a-z]+.[a-z]+@(studio.unibo|unibo).it$"}/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{required: true, message: 'Inserisci la tua password', min: 8}]}
                                    hasFeedback
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    label="Conferma password"
                                    name="conferma-password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[{
                                        required: true,
                                        message: 'Inserisci nuovamente la tua password'
                                    },
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Le due password non sono uguali'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    className="upload-btn"
                                    name="upload"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    wrapperCol={{span: 24}}
                                >
                                    <Upload name="immagine" action="/upload.do" listType="picture" accept=".png,.jpg">
                                        <Button className="upload-btn" icon={<UploadOutlined/>}>Inserisci l'immagine del
                                            profilo</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    className={'form-button'}
                                    wrapperCol={{offset: 0, span: 24}}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Registrati
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Registrazione professore" key="3" className="tabpane-container">
                            <Form.Provider
                                onFormFinish={() => {
                                    setVisible(false);
                                }}
                            >
                                <Form
                                    form={professorForm}
                                    name="basic"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    onFinish={onProfessorFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item className="first-elem" label="Nome" name="nome"
                                               rules={[{required: true, message: 'Inserisci il tuo nome'}]}>
                                        <Input pattern={"^[a-zA-Z]+$"}/>
                                    </Form.Item>

                                    <Form.Item label="Cognome" name="cognome"
                                               rules={[{required: true, message: 'Inserisci il tuo cognome'}]}>
                                        <Input pattern={"^[a-zA-Z]+([ ]{1}[a-zA-Z]+){0,2}$"}/>
                                    </Form.Item>

                                    <Form.Item label="Telefono" name="telefono"
                                               rules={[{required: true, message: 'Inserisci il tuo numero di telefono', min: 10, max: 10}]}>
                                        <Input type={"number"} min={0}/>
                                    </Form.Item>

                                    <Form.Item label="Email" name="email"
                                               rules={[{type: 'email', message: 'Inserisci una mail valida',},
                                                   {required: true, message: 'Inserisci la tua email istituzionale'}]}>
                                        <Input pattern={"^[a-z]+.[a-z]+@(studio.unibo|unibo).it$"}/>
                                    </Form.Item>

                                    <Form.Item label="Password" name="password" hasFeedback
                                               rules={[{required: true, message: 'Inserisci la tua password', min: 8}]}>
                                        <Input.Password/>
                                    </Form.Item>

                                    <Form.Item label="Conferma password" name="conferma-password"
                                               dependencies={['password']}
                                               hasFeedback
                                               rules={[{
                                                   required: true,
                                                   message: 'Inserisci nuovamente la tua password'
                                               },
                                                   ({getFieldValue}) => ({
                                                       validator(_, value) {
                                                           if (!value || getFieldValue('password') === value) {
                                                               return Promise.resolve();
                                                           }
                                                           return Promise.reject(new Error('Le due password non sono uguali'));
                                                       },
                                                   }),
                                               ]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>

                                    <Form.Item className="upload-btn" name="upload" valuePropName="fileList"
                                               getValueFromEvent={normFile}
                                               wrapperCol={{span: 24}}>
                                        <Upload name="immagine" action="/upload.do" listType="picture"
                                                accept=".png,.jpg">
                                            <Button className="upload-btn" icon={<UploadOutlined/>}>Inserisci l'immagine
                                                del profilo</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Form.List name="corso">
                                        {(fields, {add, remove}, {errors}) => (
                                            <>
                                                {fields.map((field, index) => (
                                                    <Form.Item
                                                        {...(index === 0 ? formItemLayout : addCourseLayoutWithOutLabel)}
                                                        label={index === 0 ? 'Corsi insegnati' : ''}
                                                        required={true}
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: "Inserisci un corso insegnato o elimina il campo",
                                                                },
                                                            ]}
                                                        >
                                                            <Input pattern={"^[a-zA-Z]+([ ]{1}[a-zA-Z0-9]+)*$"}
                                                                onChange={ () => {
                                                                    if (visibleClassSchedule.length <= index) {
                                                                        let copy = visibleClassSchedule
                                                                        copy.push(false)
                                                                        setVisibleClassSchedule(copy)
                                                                    }
                                                            }}/>
                                                        </Form.Item>
                                                        <Button
                                                            className="lesson-timetable-button"
                                                            type="default"
                                                            htmlType="button"
                                                            onClick={() => {
                                                                let copy = visibleClassSchedule
                                                                let i = index
                                                                setVisibleClassSchedule(copy.map((v, index) => index === i ? true : v))
                                                            }}>
                                                            Definisci l'orario delle lezioni
                                                        </Button>
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => {
                                                                let m = courseMap
                                                                m.delete(index.toString())
                                                                setCourseMap(new Map(m));
                                                                remove(field.name)}
                                                            }
                                                        />
                                                        <Divider style={{marginBottom: '6pt'}}/>
                                                        <Form.Provider
                                                            onFormFinish={() => {
                                                                let copy = visibleClassSchedule
                                                                let i = index
                                                                setVisibleClassSchedule(copy.map((v, index) => index === i ? false : v))
                                                            }}
                                                        >
                                                            <DaySelectorModalForm value={courseMap}
                                                                                  setValue={setCourseMap}
                                                                                  formName={index.toString()}
                                                                                  visible={visibleClassSchedule[index]}
                                                                                  onCancel={() => {
                                                                                      let copy = visibleClassSchedule
                                                                                      let i = index
                                                                                      setVisibleClassSchedule(copy.map((v, index) => index === i ? false : v))
                                                                                  }}/>
                                                        </Form.Provider>
                                                    </Form.Item>
                                                ))}
                                                <Form.Item wrapperCol={{offset: 0, span: 24}}>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined/>}
                                                    >
                                                        Aggiungi un corso insegnato
                                                    </Button>
                                                    <Form.ErrorList errors={errors}/>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>

                                    <Form.Item wrapperCol={{offset: 0, span: 24}}>
                                        <Button
                                            type="default"
                                            htmlType="button"
                                            onClick={() => setVisible(true)}>
                                            Definisci l'orario di ricevimento
                                        </Button>
                                    </Form.Item>

                                    <Form.Item
                                        className={'form-button'}
                                        wrapperCol={{offset: 0, span: 24}}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Registrati
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <DaySelectorModalForm value={reception}
                                                      setValue={setReception}
                                                      formName="reception"
                                                      visible={visible}
                                                      onCancel={() => setVisible(false)}/>
                            </Form.Provider>
                        </TabPane>
                    </Tabs>
                </div>
                <Route path={"/main-page"} component={MainPage}/>
            </div>
        </div>
    );
}

export default InitialForm;
