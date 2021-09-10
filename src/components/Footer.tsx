import React from "react";
import {Button} from "antd";
require("../styles/footer/footer.scss")

const AppBar: React.FC = () => {
    return (
        <div className={"footer"}>
            <Button>Indietro</Button>
        </div>
    )
}

export default AppBar;
