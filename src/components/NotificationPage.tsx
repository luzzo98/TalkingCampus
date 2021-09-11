import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBar from "./Appbar";
import Footer from "./Footer";
import * as util from "../utils/utils"
require("../styles/notificationsPage/notificationBoxStyle.scss")

interface NotificationInfo {
    id: number
    content: string
}

function getInfos():NotificationInfo[] {
    const listData: NotificationInfo[] = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            id: i,
            content: 'Lorem ipsum se amet cavallini sulla ' +
                'mia maglietta ragazzini cavallini qua crescono in fretta ' + `${i}` + ' stanno per terminare!',
        });
    }
    return listData
}

const NotificationPage = () => {

    const[data, setData] = useState(getInfos)

    function handleElimination(id: number){
        const elemId = `#${id}`
        util.removeClass(elemId, "motion-in")
        util.setClass(elemId, "motion-out")
        console.log(id)
        setTimeout(() =>
                setData(data.filter(el => el.id != id)),
            1000)
    }

    return (
            <div className={"notifications-box slide-down"}>
                <AppBar text={"Notifiche"}/>
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
                <Footer/>
            </div>
    );
}

export default NotificationPage
