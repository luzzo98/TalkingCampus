import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {List} from 'antd';
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import * as userDeserializer from "../utils/UserDeserializer";
import * as utils from "../utils/utils";
import {Student} from "../Model";
require("../styles/userPagesComponents/studentPersonalArea/studentPersonalAreaStyle.scss")

const StudentPersonalArea = () => {

    function findStudent(){
        fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/students/christian.derrico@studio.unibo.it`)
            .then(res => res.json())
            .then((json:JSON) => userDeserializer.mapToStudent(json))
            .then(s => setData(s))
    }

    const [isEntrance, setIsEntrance] = useState(() => {
            setTimeout(() => {
                setIsEntrance(true)
            }, 0);
            return false;
        }
    );
    const [data, setData] = useState<Student>()

    useEffect(() => {
        findStudent()
        console.log(Array.of(data))
    }, [])

    return (
        <CSSTransition
            in={isEntrance}
            timeout={800}
            classNames="slide-up-down"
        >
            <div className={"list-box"} id={"list-container"}>
                <AppBarTitle/>
                <SubAppBar sub_text={"Area Personale"}/>
                <List
                    size="large"
                    dataSource={data ? Object.entries(data) : []}
                    renderItem={(item) => (
                        <List.Item
                            key={`${10_000}`}>
                            <span className={"notification-text"}>{item[0]}: {item[1]}</span>
                        </List.Item>
                    )}
                >
                </List>
                <Footer onBack={() => setIsEntrance(false)}/>
            </div>
        </CSSTransition>
    );
}

export default StudentPersonalArea
