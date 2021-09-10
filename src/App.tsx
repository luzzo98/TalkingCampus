import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "./routes/routes";

const App:React.FC = () => {

    return (
        <div className={"App"}>
            <div className={"BackgroundImg"}/>
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
