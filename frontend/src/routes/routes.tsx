import {Route, Switch} from "react-router-dom";
import InitialForm from "../components/InitialForm";
import MainPage from "../components/MainPage";
import DaySelector from "../components/DaySelector";
import React from "react";
import EditableListComponent from "../components/EditableListComponent";
import StudentPersonalArea from "../components/StudentPersonalArea";

interface hoursArray { //TODO rimuovere placeolder
    hours: {
        start: string,
        end: string,
        day: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì',
        room: string
    }[]
}

const myHours:hoursArray["hours"] =[
    { start:"10:00", end:"11:00", day:'Lunedì', room:'Aula 3.3' },
    { start:"20:00", end:"21:00", day:'Martedì', room:'Aula 3.4' }
]

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={InitialForm}/>
            <Route path="/DaySelector">
                <DaySelector hours={myHours}/>
            </Route>
            <Route path={"/main-page"} component={MainPage}/>
            <Route path={"/student-notifications"} component={() => EditableListComponent("Notifiche")}/>
            <Route path={"/registered-rooms"} component={() => EditableListComponent("Aule Registrate")}/>
            <Route path={"/student-personal-area"} component={StudentPersonalArea}/>
        </Switch>
    );
}
