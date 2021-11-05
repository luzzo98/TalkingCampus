import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {List} from 'antd';
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import {Student} from "../Model";
import PersonalAreaService from "../services/PersonalAreaService";
import getUser from "../services/UserLocalInfoGetter";
require("../styles/userPagesComponents/studentPersonalArea/studentPersonalAreaStyle.scss")

const StudentPersonalArea = () => {

    function findStudent(email: string){
        PersonalAreaService.findStudent(email, s => setData(s))
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
        findStudent(getUser().email)
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
