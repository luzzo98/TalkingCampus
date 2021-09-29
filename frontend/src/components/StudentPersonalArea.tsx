import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {List} from 'antd';
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
require("../styles/studentPersonalArea/studentPersonalAreaStyle.scss")

const StudentPersonalArea = () => {

    const [isEntrance, setIsEntrance] = useState(true)

    const data = [
            'Nome: Giovanni',
            'Cognome: Rossi',
            'Numero di telefono: 3329432849',
            'Email: giovanna.rossi@email.com'
    ];

    return (
        <div className={"list-box " + (isEntrance ? "slide-down" : "slide-up")} id={"list-container"}>
            <AppBarTitle/>
            <SubAppBar sub_text={"Area Personale"}/>
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
            <Footer onBack={() => setIsEntrance(false)}/>
        </div>
    );
}

export default StudentPersonalArea
