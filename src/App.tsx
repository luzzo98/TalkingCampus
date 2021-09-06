import React, {useState} from 'react';
import InitialForm from "./components/InitialForm";
import './styles/App.css';
import {Switch, BrowserRouter as Router, Route, Link} from "react-router-dom";
import MainPage from "./components/MainPage";

const App:React.FC = () => {

    function linkToRoute(path: string, text: string):JSX.Element {
        return <Link to={path}>{text}</Link>
    }

    return (
        <Router>
            <div className={"App"}>
                <div className={"BackgroundImg"}/>
            </div>
            <Switch>
                <Route exact path="/" component={() => InitialForm({linkToRoute})}/>
                <Route path="/main-page" component={MainPage}/>
            </Switch>
        </Router>
    );
}

export default App;
