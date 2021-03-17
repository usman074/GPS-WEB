import React from "react";

//Components
import {LoginScreen} from './components/LoginScreen/LoginScreen';
//User Provider

//External Libs
import { Route, Redirect, Switch } from "react-router-dom";

//Configs

import logo from "./logo.svg";
import "./App.css";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <LoginScreen />
    </div>
  );
}

export default App;
