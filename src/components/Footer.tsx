import React from "react";
import {Button} from "antd";
import {useHistory} from "react-router-dom";
require("../styles/footer/footer.scss")

const AppBar: React.FC = () => {

    let history = useHistory()
    function handleClick(){
        //history.push("/main-page")
    }

    return (
        <div className={"footer"}>
            <Button onClick={handleClick}>Indietro</Button>
        </div>
    )
}

export default AppBar;
