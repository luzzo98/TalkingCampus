import React from 'react';
import './App.css';
import Tab from "./components/Tab";
import TabTitle from "./components/TabTitle";
import Tabs from "./components/Tabs";

function App() {
    return (
      <div className={"App"}>
          {/*<div className={"BackgroundImg"}>*/}
          {/*</div>*/}
          {/*<form className={"Login"}>*/}
          {/*    <label>*/}
          {/*        Email:*/}
          {/*        <input type="text" name="Email" />*/}
          {/*    </label>*/}
          {/*    <br/>*/}
          {/*    <label>*/}
          {/*        Password:*/}
          {/*        <input type="password" name="Password" />*/}
          {/*    </label>*/}
          {/*    <br/>*/}
          {/*    <input type="submit" value="Submit" />*/}
          {/*</form>*/}

          <Tabs>
              <Tab title="Lemon">Lemon is yellow</Tab>
              <Tab title="Strawberry">Strawberry is red</Tab>
              <Tab title="Pear">Pear is green</Tab>
          </Tabs>

      </div>
  );
}

export default App;
