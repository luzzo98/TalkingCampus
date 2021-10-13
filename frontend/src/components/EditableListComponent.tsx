import React, {useEffect, useRef, useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
import {ListItem} from "../Model";
import * as listItemDeserializer from "../utils/ListItemDeserializer"
import * as utils from "../utils/utils"
require("../styles/userPagesComponents/list_component/notificationBoxStyle.scss")

const io = require("socket.io-client");
const socket = io("http://localhost:8080/");

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    function getNotifications(room: string){
        fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/get-notifications/${room}`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map( (value: any) => listItemDeserializer.mapToNotification(value)))
            .then(items => setData(prevState => prevState.concat(
                    items.filter(e => !prevState.find(p => p.id === e.id)))
                )
            )
    }

    function getObsRoom(email: string){
        fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/get-observed-rooms/${email}`)
            .then(res => res.json())
            .then((json:string[]) => json.map( (value: any) => listItemDeserializer.mapToClass(value)))
            .then(items => setData(items))
    }

    function deleteNotification(id: string){
        fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/del-notification/${id}`)
    }

    function deleteObsRoom(email:string, room: string){
        fetch(`${utils.BASE_URL}${utils.NODE_PORT}/api/del-observed-room/${email}/${room}`)
    }

    useEffect(() => {
            if(sub_title === "Notifiche"){
                ["Bagno 1.7", "Bagno 1.4"].forEach(e => socket.on("notification: " + e, () => getNotifications(e)));
                ["Bagno 1.7", "Bagno 1.4"].forEach(e => getNotifications(e))
            } else
                getObsRoom("christian.derrico@studio.unibo.it")
        }, [])

    const[data, setData] = useState<ListItem[]>([])
    const[isEntrance, setIsEntrance] = useState(() => {
        setTimeout(() => { setIsEntrance(true) }, 0);
        return false
    })

    function handleElimination(id: string){
        const elemId = `${id}`
        setData(data.filter(el => el.id != id))
        if(sub_title === "Notifiche")
            deleteNotification(id)
        else
            deleteObsRoom("christian.derrico@studio.unibo.it",id)
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
