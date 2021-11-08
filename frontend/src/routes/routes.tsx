import {Route, Switch} from "react-router-dom";
import InitialForm from "../components/InitialForm";
import MainPage from "../components/MainPage";
import DaySelector from "../components/DaySelector";
import React from "react";
import EditableListComponent from "../components/EditableListComponent";
import PersonalArea from "../components/PersonalArea";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={InitialForm}/>
            <Route path="/DaySelector" component={DaySelector}/>
            <Route path={"/main-page"} component={MainPage}/>
            <Route path={"/student-notifications"} component={() => EditableListComponent("Notifiche")}/>
            <Route path={"/registered-rooms"} component={() => EditableListComponent("Aule Registrate")}/>
            <Route path={"/personal-area"} component={PersonalArea}/>
        </Switch>
    );
}
