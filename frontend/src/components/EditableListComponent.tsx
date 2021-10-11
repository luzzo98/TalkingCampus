import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import * as lessonDeserializer from "../utils/LessonDeserializer";
require("../styles/userPagesComponents/list_component/notificationBoxStyle.scss")

const io = require("socket.io-client");
const socket = io("http://localhost:8080/");

interface ListItem {
    _id: string
    key: number
    content: string
}

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    function getNotifications(){
        let id = 0;
        fetch(`http://localhost:80/api/get-notifications/christian.derrico@unibo.it`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map( (value: any) => {
                return {
                    _id: value._id,
                    key: id++,
                    content: "" + value.message
                    } as ListItem;
                }
            ))
            .then(i => {console.log(i); return i})
            .then(items => setData(items))
    }

    function deleteNotification(id: string){
        fetch(`http://localhost:80/api/del-notification/${id}`)
    }

    useEffect(() => {
        if(sub_title === "Notifiche")
            socket.on("notification: christian.derrico@unibo.it", () => getNotifications())
    }, [])

    const[data, setData] = useState<ListItem[]>([])
    const[isEntrance, setIsEntrance] = useState(() => {
        setTimeout(() => { setIsEntrance(true) }, 0);
        return false
    })

    useEffect(() => {
        getNotifications()
    }, [isEntrance])

    function handleElimination(id: number){
        const elemId = `${id}`
        setData(data.filter(el => el.key != id))
        deleteNotification(data.find(e => e.key === id)?._id as string)
    }

    return (
        <CSSTransition
            in={isEntrance}
            timeout={800}
            classNames="slide-up-down"
        >
            <div className={"notifications-box"} id={"list-container"}>
                <AppBarTitle/>
                <SubAppBar sub_text={sub_title}/>
                    <List
                        size="large"
                        pagination= {{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                            simple: true
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                className={"motion-in"}
                                key={`${item.key}`}
                                id={`${item.key}`}
                                extra={[
                                    <Button size = "small"
                                            onClick={(e) => handleElimination(item.key)}
                                            className={"btn-notification"}
                                            icon={<CloseCircleOutlined className={"btn-icon"}/>}/>
                                ]}>
                                <span className={"notification-text"}>{item.content}</span>
                            </List.Item>
                        )}
                    >
                    </List>
                <Footer onBack={() => setIsEntrance(false)}/>
            </div>
        </CSSTransition>
    );
}

export default EditableListComponent
