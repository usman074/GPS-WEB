import React, { useState, useEffect } from "react";

//Components
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";
import {Dashboard} from './components/Dashboard/Dashboard'
import { Sidemenu, Header } from "./components/common";
//User Provider

//External Libs
import { Route, Redirect, Switch } from "react-router-dom";

//Configs

import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import {
  AppContainer,
  HeaderWrapper,
  SidemenuWrapper,
  ContentWrapper,
} from "./layoutStyle";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="App">
      {/* <LoginScreen /> */}
      <AppContainer isLogin={isLogin}>
        <SidemenuWrapper>
          <Sidemenu isLogin={isLogin} />
        </SidemenuWrapper>
        {isLogin && (
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
        )}
        {/* <ContentWrapper>
          <SettingsScreen />
        </ContentWrapper> */}
        <Switch>
          <ContentWrapper isLogin={isLogin}>
            <Route path="/login">
              <LoginScreen isLogin={isLogin} setIsLogin={setIsLogin} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/settings/user">
              <SettingsScreen />
            </Route>
            <Route path="/settings/language">
              <SettingsScreen />
            </Route>
            <Route path="/settings/terms">
              <SettingsScreen />
            </Route>
            <Redirect from="/" exact to="/login"></Redirect>
          </ContentWrapper>
        </Switch>
      </AppContainer>
    </div>
  );
}

export default App;
