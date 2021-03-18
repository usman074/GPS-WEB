import React from "react";

//Components
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { Sidemenu, Header } from "./components/common";
//User Provider

//External Libs
import { Route, Redirect, Switch } from "react-router-dom";

//Configs

import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { AppContainer, HeaderWrapper, SidemenuWrapper } from "./layoutStyle";

function App() {
  return (
    <div className="App">
      {/* <LoginScreen /> */}
      <AppContainer>
        <SidemenuWrapper>
          <Sidemenu />
        </SidemenuWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
      </AppContainer>
    </div>
  );
}

export default App;
