import React from "react";
import {Route, Switch} from "react-router-dom";
import InitialForm from "../components/InitialForm";
import MainPage from "../components/MainPage";
import DaySelector from "../components/DaySelector";
import EditableListComponent from "../components/EditableListComponent";
import PersonalArea from "../components/PersonalArea";
import CourseTable from "../components/CourseTable";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={InitialForm}/>
            <Route path={"/day-selector"} component={DaySelector}/>
            <Route path={"/main-page"} component={MainPage}/>
            <Route path={"/student-notifications"} component={() => EditableListComponent("Notifiche")}/>
            <Route path={"/registered-rooms"} component={() => EditableListComponent("Locali registrati")}/>
            <Route path={"/personal-area"} component={PersonalArea}/>
            <Route path={"/course-table"} component={CourseTable}/>
        </Switch>
    );
}
