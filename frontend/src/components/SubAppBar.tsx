import React from "react";
import {ModalTitle} from "react-bootstrap";
require("../styles/appBar/appBarStyle.scss")

interface Props {
    sub_text: string
}

const SubAppBar: React.FC<Props> = ({sub_text}) => {
    return (
        <div className={"bottom-header"}>
            <ModalTitle> {sub_text} </ModalTitle>
            <hr/>
        </div>
    )
}

export default SubAppBar;
