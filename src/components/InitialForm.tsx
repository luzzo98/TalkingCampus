import React, {useState} from "react";
import { Form, Input, Button, Tabs } from 'antd';
import 'antd/dist/antd.css';
import {Link, BrowserRouter as Router} from "react-router-dom"
const { TabPane } = Tabs;

interface Props {
    linkToRoute: (path: string, text: string) => JSX.Element
}

const InitialForm:React.FC<Props> = ({linkToRoute}) => {

    const [username, setUserName] = useState("")
    const [passw, setPassw] = useState("")

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="card-container">
            <Tabs type="card">
                <TabPane tab="Login" key="1" className="tabpane-container">
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Inserisci la tua email istituzionale' }]}
                        >
                            <Input onChange={(e) => setUserName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Inserisci la tua password' }]}
                        >
                            <Input.Password onChange={(e) => setPassw(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            className={'form-button'}
                            // wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">
                                {linkToRoute("/main-page","Accedi")}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Registrazione studente" key="2" className="tabpane-container">
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Nome"
                            name="nome"
                            rules={[{ required: true, message: 'Inserisci il tuo nome' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Cognome"
                            name="cognome"
                            rules={[{ required: true, message: 'Inserisci il tuo cognome' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Telefono"
                            name="telefono"
                            rules={[{ required: true, message: 'Inserisci il tuo numero di telefono' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Inserisci il tuo numero di telefono' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Inserisci la tua password' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Conferma password"
                            name="conferma-password"
                            rules={[{ required: true, message: 'Inserisci nuovamente la tua password' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        todo immagine + pulsante di selezione
                        todo aggiungere matricola e tipo di università?
                        todo non scorre e la visione mobile non va
                        todo le textbox sono di dimensioni diverse

                        <Form.Item
                            className={'form-button'}
                            // wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Registrati
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Registrazione professore" key="3" className="tabpane-container">
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            className={'form-button'}
                            // wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Registrati
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default InitialForm;
