import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InitialForm from "./components/InitialForm";
import './styles/App.css';
import DaySelector from "./components/DaySelector";

interface hoursArray {
    hours: {
        start: string,
        end: string,
        day: 'lunedi' | 'martedi' | 'mercoledi' | 'giovedi' | 'venerdi',
        room: string
    }[]
}

const myHours:hoursArray["hours"] =[
    { start:"10:00", end:"11:00", day:'lunedi', room:'Aula 3.3' },
    { start:"20:00", end:"21:00", day:'martedi', room:'Aula 3.4' }
]

function App() {
    return (
        <Router>
            <div>
                <div className={"App"}>
                    <div className={"BackgroundImg"}/>
                </div>
                <Switch>
                    <Route path="/DaySelector">
                        <DaySelector hours={myHours}/>
                    </Route>
                    <Route path="/">
                        <InitialForm/>
                    </Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;
