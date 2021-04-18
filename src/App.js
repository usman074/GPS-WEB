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
import { TermsProvider } from "./providers/TermsProvider";
import { VehicleProider } from "./providers/VehicleProvider";
import { IntervalProvider } from "./providers/IntervalProvider";

//External Libs
import { Route, Redirect, Switch, useHistory } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  AppContainer,
  HeaderWrapper,
  SidemenuWrapper,
  ContentWrapper,
} from "./layoutStyle";

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      history.replace("/login");
    }
  }, [token]);
  return (
    <div className="App">
      <AuthProvider>
        <VehicleProider>
          <AppContainer isLogin={isLogin}>
            <SidemenuWrapper>
              <Sidemenu isLogin={isLogin} />
            </SidemenuWrapper>
            {isLogin && (
              <HeaderWrapper>
                <Header setIsLogin={setIsLogin} setToken={setToken} />
              </HeaderWrapper>
            )}
            <SettingUserContext setIsLogin={setIsLogin} />
            <Switch>
              <ContentWrapper isLogin={isLogin}>
                <ProtectedRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                ></ProtectedRoute>
                <IntervalProvider>
                  <ProtectedRoute
                    exact
                    path="/interval"
                    component={IntervalScreen}
                  ></ProtectedRoute>
                </IntervalProvider>
                <UserProvider>
                  <ProtectedRoute
                    exact
                    path="/settings/user/edit"
                    component={SettingsScreen}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    exact
                    path="/settings/user"
                    component={SettingsScreen}
                  ></ProtectedRoute>
                </UserProvider>
                <ProtectedRoute
                  exact
                  path="/settings/language"
                  component={SettingsScreen}
                ></ProtectedRoute>
                <TermsProvider>
                  <ProtectedRoute
                    exact
                    path="/settings/terms/edit"
                    component={SettingsScreen}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    exact
                    path="/settings/terms"
                    component={SettingsScreen}
                  ></ProtectedRoute>
                </TermsProvider>
                <Route path="/login">
                  <LoginScreen isLogin={isLogin} setIsLogin={setIsLogin} />
                </Route>
                {!token && <Redirect from="/" exact to="/login"></Redirect>}
              </ContentWrapper>
            </Switch>
          </AppContainer>
        </VehicleProider>
      </AuthProvider>
    </div>
  );
}

export default App;
