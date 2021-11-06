import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import {ListItem} from "../Model";
import * as utils from "../utils/utils"
import PrivateContentService from "../services/PrivateContentService";
import getUser from "../services/UserLocalInfoGetter";
require("../styles/userPagesComponents/list_component/notificationBoxStyle.scss")

const io = require("socket.io-client");
const socket = io(`${utils.BASE_URL}${utils.SOCKET_IO_PORT}`);

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    function getObservedRooms(email: string){
        PrivateContentService.getObservedRooms(
            email, items => setObservedRooms(items)
        )
    }

    function deleteObsRoom(email:string, room: string){
        PrivateContentService.deleteObsRoom(email, room)
    }

    function getNotifications(room: string, email: string){
        PrivateContentService.getNotifications(room, email, items =>
            setData(prevState => prevState.concat(items.filter(e => !prevState.find(p => p.id === e.id))))
        )
    }

    function deleteNotification(id: string){
        PrivateContentService.deleteNotification(id)
    }

    const[data, setData] = useState<ListItem[]>([])
    const[observedRooms, setObservedRooms] = useState<ListItem[]>([])
    const[isEntrance, setIsEntrance] = useState(() => {
        setTimeout(() => { setIsEntrance(true) }, 0);
        return false
    })

    useEffect(() => {
        getObservedRooms(getUser().email)
    }, [])

    useEffect(() => {
        if(sub_title === "Notifiche"){
            observedRooms.forEach(e =>
                socket.on("notification: " + e.id, () => getNotifications(e.id, getUser().email))
            );
            observedRooms.forEach(e => getNotifications(e.id, getUser().email))
        } else
            setData(observedRooms)
    }, [observedRooms])

    function handleElimination(id: string){
        setData(data.filter(el => el.id != id))
        if(sub_title === "Notifiche"){
            socket.removeListener("notification: " + id)
            deleteNotification(id)
        } else
            deleteObsRoom(getUser().email, id)
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
                                key={`${item.id}`}
                                id={`${item.id}`}
                                extra={[
                                    <Button size = "small"
                                            onClick={(e) => handleElimination(item.id)}
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
