import React, {useState} from 'react';
import InitialForm from "./components/InitialForm";
import './styles/App.css';
import {Switch, Link, BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/MainPage";

const App:React.FC = () => {

    function linkToRoute(text: string) {
        return <Link to={"/main-page"}>{text}</Link>
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
