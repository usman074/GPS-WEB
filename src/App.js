import React, { useState, useEffect } from "react";

//Components
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";
import { IntervalScreen } from "./components/IntervalScreen/IntervalScreen";
import { Dashboard } from "./components/Dashboard/Dashboard";
import {
  Sidemenu,
  Header,
  ProtectedRoute,
  SettingUserContext,
} from "./components/common";
//Provider
import { AuthProvider } from "./providers/AuthProvider";
import { UserProvider } from "./providers/UserProvider";

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
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("uid");

  useEffect(()=> {
    if (token) {
      setIsLogin(true)
    }
  }, token)
  return (
    <div className="App">
      <AppContainer isLogin={isLogin}>
        <SidemenuWrapper>
          <Sidemenu isLogin={isLogin} />
        </SidemenuWrapper>
        {isLogin && (
          <HeaderWrapper>
            <Header setIsLogin={setIsLogin} />
          </HeaderWrapper>
        )}
        <AuthProvider>
          <SettingUserContext setIsLogin={setIsLogin} />
          <Switch>
            <ContentWrapper isLogin={isLogin}>
              <ProtectedRoute
                path="/dashboard"
                component={Dashboard}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/interval"
                component={IntervalScreen}
              ></ProtectedRoute>
              <UserProvider>
                <ProtectedRoute
                  path="/settings/user"
                  component={SettingsScreen}
                ></ProtectedRoute>
              </UserProvider>
              <ProtectedRoute
                path="/settings/language"
                component={SettingsScreen}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/settings/terms"
                component={SettingsScreen}
              ></ProtectedRoute>
              <Route path="/login">
                <LoginScreen isLogin={isLogin} setIsLogin={setIsLogin} />
              </Route>
              {!token && <Redirect from="/" exact to="/login"></Redirect>}
            </ContentWrapper>
          </Switch>
        </AuthProvider>
      </AppContainer>
    </div>
  );
}

export default App;
