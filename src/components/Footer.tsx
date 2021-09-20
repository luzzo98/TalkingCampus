import React from "react";
import {Button} from "antd";
import {useHistory} from "react-router-dom";
require("../styles/footer/footer.scss")

interface Props {
    onBack: () => void
}

const AppBar: React.FC<Props> = ({onBack}) => {

    let history = useHistory()
    function handleClick(){
        onBack()
        //history.push("/main-page")
    }

    return (
        <div className={"footer"}>
            <Button onClick={handleClick}>Indietro</Button>
        </div>
    )
}

export default AppBar;
