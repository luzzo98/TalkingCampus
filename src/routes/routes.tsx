import {Route, Switch} from "react-router-dom";
import InitialForm from "../components/InitialForm";
import MainPage from "../components/MainPage";
import React from "react";
import NotificationsPage from "../components/NotificationsPage";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={InitialForm}/>
            <Route path={"/main-page"} component={MainPage}/>
            <Route path={"/student-notifications"} component={NotificationsPage}/>
        </Switch>
    );
}
