import React, {useEffect, useRef, useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import set = Reflect.set;
require("../styles/userPagesComponents/list_component/notificationBoxStyle.scss")

const io = require("socket.io-client");
const socket = io("http://localhost:8080/");

interface ListItem {
    _id: string
    key: number
    content: string
}

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    function getNotifications(room: string){
        fetch(`http://localhost:80/api/get-notifications/${room}`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map( (value: any) => {
                const elem = {
                    _id: value._id,
                    content: "" + value.message
                    } as ListItem;
                return elem
                }
            ))
            .then(items => setData(prevState => prevState.concat(
                    items.filter(e => !prevState.find(p => p._id === e._id)))
                )
            )
    }

    function deleteNotification(id: string){
        fetch(`http://localhost:80/api/del-notification/${id}`)
    }

    useEffect(() => {
        switch(sub_title){
            case "Notifiche":
                ["Bagno 1.7", "Bagno 1.4"].forEach(e => socket.on("notification: " + e,
                    () => getNotifications(e)))
                break;
            case "Aule Registrate":
                break;
        }
        ["Bagno 1.7", "Bagno 1.4"].forEach(e => getNotifications(e))
    }, [])

    const[data, setData] = useState<ListItem[]>([])
    const[isEntrance, setIsEntrance] = useState(() => {
        setTimeout(() => { setIsEntrance(true) }, 0);
        return false
    })

    function handleElimination(id: string){
        const elemId = `${id}`
        setData(data.filter(el => el._id != id))
        deleteNotification(id)
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
                                key={`${item._id}`}
                                id={`${item._id}`}
                                extra={[
                                    <Button size = "small"
                                            onClick={(e) => handleElimination(item._id)}
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
