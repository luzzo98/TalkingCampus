import React from 'react';
import 'antd/dist/antd.css';
import {List} from 'antd';
import AppBar from "./Appbar";
import Footer from "./Footer";
require("../styles/studentPersonalArea/studentPersonalAreaStyle.scss")

const StudentPersonalArea = () => {

    const data = [
            'Nome: Giovanni',
            'Cognome: Rossi',
            'Numero di telefono: 3329432849',
            'Email: giovanna.rossi@email.com'
    ];

    return (
        <div className={"list-box slide-down"} id={"list-container"}>
            <AppBar text={"Area personale"}/>
            <List
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={`${10_000}`}>
                        <span className={"notification-text"}>{item}</span>
                    </List.Item>
                )}
            >
            </List>
            <Footer/>
        </div>
    );
}

export default StudentPersonalArea
