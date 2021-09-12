import React from "react";
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import * as utils from "../utils/utils"
require("../styles/footer/footer.scss")

const AppBar: React.FC = () => {

    let history = useHistory()
    function handleClick(){
        utils.removeClass("#list-container", "slide-down")
        utils.setClass("#list-container", "slide-up")
        //history.push("/main-page")
    }

    return (
        <div className={"footer"}>
            <Button onClick={handleClick}>Indietro</Button>
        </div>
    )
}

export default AppBar;
