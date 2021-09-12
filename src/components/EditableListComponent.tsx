import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import * as util from "../utils/utils"
import SubAppBar from "./SubAppBar";
require("../styles/list_component/notificationBoxStyle.scss")

interface ListItem {
    id: number
    content: string
}

function getInfos():ListItem[] {
    const listData: ListItem[] = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            id: i,
            content: 'I posti nell\'aula 3.3 stanno per terminare',
        });
    }
    return listData
}

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    const[data, setData] = useState(getInfos)

    function handleElimination(id: number){
        const elemId = `#${id}`
        util.removeClass(elemId, "motion-in")
        util.setClass(elemId, "motion-out")
        setTimeout(() =>
                setData(data.filter(el => el.id != id)),
            1000)
    }

    return (
            <div className={"notifications-box slide-down"} id={"list-container"}>
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
                <Footer/>
            </div>
    );
}

export default EditableListComponent
