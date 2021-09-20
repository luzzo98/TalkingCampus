import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/App.css';
import {Routes} from "./routes/routes";

const App:React.FC = () => {
    return (
  //       <Router>
  //           <div>
  //               <div className={"App"}>
  //                   <div className={"BackgroundImg"}/>
  //               </div>
  //               <Switch>
  //                   <Route path="/DaySelector">
  //                       <DaySelector hours={myHours}/>
  //                   </Route>
  //                   <Route path="/">
  //                       <InitialForm/>
  //                   </Route>
  //               </Switch>
  //           </div>
  //       </Router>
  // );
        <div className={"App"}>
            <div className={"BackgroundImg"}/>
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
