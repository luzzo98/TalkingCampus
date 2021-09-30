import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {List, Button} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";
import AppBarTitle from "./AppBarTitle";
import Footer from "./Footer";
import SubAppBar from "./SubAppBar";
import {CSSTransition} from "react-transition-group";
require("../styles/userPagesComponents/list_component/notificationBoxStyle.scss")

interface ListItem {
    id: number
    content: string
}

function getInfos():ListItem[] {
    const listData: ListItem[] = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            id: i,
            content: `I posti nell\'aula ${i} stanno per terminare`,
        });
    }
    return listData
}

const EditableListComponent: React.FC<string> = (sub_title: string) => {

    const[data, setData] = useState(getInfos)
    const [isOpeningView, setIsOpeningView] = useState(() => {
        setTimeout(() => { setIsOpeningView(true) }, 0);
        return false
    })
    const[isEntrance, setIsEntrance] = useState(() => {
        setTimeout(() => { setIsEntrance(true) }, 0);
        return false
    })

    function handleElimination(id: number){
        const elemId = `${id}`
        setData(data.filter(el => el.id != id))
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
