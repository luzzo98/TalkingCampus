import Title from "antd/es/typography/Title";
import React from "react";
import {ModalTitle, OffcanvasTitle} from "react-bootstrap";
require("../styles/appBar/appBarStyle.scss")

interface Props {
    text: string
}

const AppBar: React.FC<Props> = ({text}) => {
    return (
        <div className={"appbar"}>
            <div className={"header"}><Title>Talking Campus</Title></div>
            <div className={"bottom-header"}>
                <ModalTitle> {text} </ModalTitle>
            </div>
            <hr/>
        </div>
    )
}

export default AppBar;
