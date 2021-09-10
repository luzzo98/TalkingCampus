import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button, Pagination} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBar from "./Appbar";
import Footer from "./Footer";
require("../styles/notificationsPage/notificationBoxStyle.scss")

interface NotificationInfo {
    title: string
    content: string
}

const listData: NotificationInfo[] = [];

for (let i = 0; i < 23; i++) {
    listData.push({
        title: `ant design part ${i}`,
        content:
            'I posti nell\'aula 3.3 stanno per terminare!',
    });
}

const NotificationsPage = () => {
    return (
        <div className={"notifications-box"}>
            <AppBar text={"Notifiche"}/>
            <List
                itemLayout="vertical"
                size="large"
                pagination= {{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                    simple: true
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<Button className={"btn-notification"} icon={<CloseCircleOutlined className={"btn-icon"}/>}/>]}
                    >
                        <span className={"notification-text"}>{item.content}</span>
                    </List.Item>
                )}
            >
            </List>
            <Footer/>
        </div>
    );
}

export default NotificationsPage
