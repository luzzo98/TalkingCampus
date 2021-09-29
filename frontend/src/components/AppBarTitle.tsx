import Title from "antd/es/typography/Title";
import React from "react";
require("../styles/appBar/appBarStyle.scss")

const AppBarTitle: React.FC = () => {
    return (
        <div className={"appbar-title"}>
            <div className={"header"}><Title>Talking Campus</Title></div>
        </div>
    )
}

export default AppBarTitle;
