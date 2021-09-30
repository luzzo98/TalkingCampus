import React, {useState} from "react";
import {Form, Input, Button, Tabs, Upload, Select, Divider} from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import {Link, Route} from "react-router-dom";
import MainPage from "./MainPage";
import * as utils from "../utils/utils";
import {User} from "../Model";
import img from "../assets/volto_uomo.jpg"
import AppBarTitle from "./AppBarTitle";
require("../styles/initialForm/initialFormStyle.scss")

const { TabPane } = Tabs;
const { Option } = Select;

const mockUser: User = {
    id: 0,
    name: "Giovanni",
    img: img,
    role: "student"
}

const InitialForm:React.FC = () => {

    const [username, setUserName] = useState("")
    const [passw, setPassw] = useState("")
    const history = useHistory();
    const [form] = Form.useForm();

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

    const addCoursLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 15, offset: 9 },
        },
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e: any) => {
        //todo elimina il log
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    return(
        <div className={'initialForm'}>
            <div className="card-container">
                <div>
                    <AppBarTitle/>
                    <Tabs type="card">
                        <TabPane tab="Login" key="1" className="tabpane-container">
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    className="first-elem"
                                    name="email"
                                    label="Email"
                                    rules={[{
                                        type: 'email',
                                        message: 'Inserisci una mail valida',
                                    },{
                                        required: true,
                                        message: 'Inserisci la tua email istituzionale'
                                    }]}
                                >
                                    <Input onChange={(e) => setUserName(e.target.value)}/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: 'Inserisci la tua password' }]}
                                >
                                    <Input.Password onChange={(e) => setPassw(e.target.value)}/>
                                </Form.Item>

                                <Form.Item
                                    className={'form-button'}
                                    wrapperCol={{ offset: 0, span: 24 }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        <Link to={{
                                            pathname: "/main-page",
                                            state: {user: mockUser, hooks: utils.getElements(mockUser)}
                                        }}>Accedi</Link>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Registrazione studente" key="2" className="tabpane-container">
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 15 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    className="first-elem"
                                    label="Nome"
                                    name="nome"
                                    rules={[{ required: true, message: 'Inserisci il tuo nome' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Cognome"
                                    name="cognome"
                                    rules={[{ required: true, message: 'Inserisci il tuo cognome' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Telefono"
                                    name="telefono"
                                    rules={[{ required: true, message: 'Inserisci il tuo numero di telefono' }]}
                                >
                                    <Input type={"number"}/>
                                </Form.Item>

                                <Form.Item
                                    name="universita"
                                    label="Università"
                                    rules={[{ required: true, message: 'Seleziona il tuo corso universitario' }]}
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
                                    rules={[{ required: true, message: 'Inserisci la tua matricola' }]}
                                >
                                    <Input min={0} type={"number"}/>
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{
                                        type: 'email',
                                        message: 'Inserisci una mail valida',
                                    },{
                                        required: true,
                                        message: 'Inserisci la tua email istituzionale'
                                    }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Inserisci la tua password' }]}
                                    hasFeedback
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    label="Conferma password"
                                    name="conferma-password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[{ required: true,
                                        message: 'Inserisci nuovamente la tua password'
                                    },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('Le due password che hai inserito non sono uguali'));
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
                                    wrapperCol={{ span: 24 }}
                                    // extra="test extra"
                                >
                                    <Upload name="immagine" action="/upload.do" listType="picture" accept=".png,.jpg">
                                        <Button className="upload-btn" icon={<UploadOutlined />}>Inserisci l'immagine del profilo</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    className={'form-button'}
                                    wrapperCol={{ offset: 0, span: 24 }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Registrati
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Registrazione professore" key="3" className="tabpane-container">
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 15}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item className="first-elem" label="Nome" name="nome"
                                           rules={[{ required: true, message: 'Inserisci il tuo nome' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Cognome" name="cognome"
                                           rules={[{ required: true, message: 'Inserisci il tuo cognome' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Telefono" name="telefono"
                                           rules={[{ required: true, message: 'Inserisci il tuo numero di telefono' }]}>
                                    <Input type={"number"}/>
                                </Form.Item>

                                <Form.Item label="Email" name="email"
                                           rules={[{type: 'email', message: 'Inserisci una mail valida',},
                                               {required: true, message: 'Inserisci la tua email istituzionale'}]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Password" name="password" hasFeedback
                                           rules={[{ required: true, message: 'Inserisci la tua password' }]}>
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item label="Conferma password" name="conferma-password" dependencies={['password']} hasFeedback
                                           rules={[{ required: true, message: 'Inserisci nuovamente la tua password'},
                                               ({ getFieldValue }) => ({
                                                   validator(_, value) {
                                                       if (!value || getFieldValue('password') === value) {
                                                           return Promise.resolve();
                                                       }
                                                       return Promise.reject(new Error('Le due password che hai inserito non sono uguali'));
                                                   },
                                               }),
                                           ]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item className="upload-btn" name="upload" valuePropName="fileList"
                                           getValueFromEvent={normFile} wrapperCol={{ span: 24 }} /* extra="test extra" */>
                                    <Upload name="immagine" action="/upload.do" listType="picture" accept=".png,.jpg">
                                        <Button className="upload-btn" icon={<UploadOutlined />}>Inserisci l'immagine del profilo</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.List name="corso">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0 ? formItemLayout : addCoursLayoutWithOutLabel)}
                                                    label={index === 0 ? 'Corsi insegnati' : ''}
                                                    required={true}
                                                    key={field.key}
                                                >
                                                    {index > 0 ? (<Divider/>) : null}
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
                                                        noStyle
                                                    >
                                                        <Input style={{ width: '90%' }} />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                    <Button
                                                        className="lesson-timetable-button"
                                                        type="default"
                                                        htmlType="button"
                                                        onClick={() => history.push('/DaySelector')}>
                                                        Definisci l'orario delle lezioni
                                                    </Button>
                                                </Form.Item>
                                            ))}
                                            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Aggiungi un corso insegnato
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                    <Button
                                        type="default"
                                        htmlType="button"
                                        onClick={() => history.push('/DaySelector')}>
                                        Definisci l'orario di ricevimento
                                    </Button>
                                </Form.Item>

                                <Form.Item
                                    className={'form-button'}
                                    wrapperCol={{ offset: 0, span: 24 }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Registrati
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
                <Route path={"/main-page"} component={MainPage}/>
            </div>
        </div>
    );
}

export default InitialForm;
