import {Route, Switch} from "react-router-dom";
import InitialForm from "../components/InitialForm";
import MainPage from "../components/MainPage";
import React from "react";
import EditableListComponent from "../components/EditableListComponent";
import StudentPersonalArea from "../components/StudentPersonalArea";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={InitialForm}/>
            <Route path={"/main-page"} component={MainPage}/>
            <Route path={"/student-notifications"} component={() => EditableListComponent("Notifiche")}/>
            <Route path={"/registered-rooms"} component={() => EditableListComponent("Aule Registrate")}/>
            <Route path={"/student-personal-area"} component={StudentPersonalArea}/>
        </Switch>
    );
}
