import React, { useState, useEffect } from "react";

//Actions
import { actionTemplateFunc } from "../../actions/actionTemplate";

//Custom Hooks
import useApiCall from "../../customHooks/apiCallHook";

//Contexts
import { useUserContext } from "../../contexts/userContext";

//Styled Components
import { MainWrapper } from "./style";

const ComponentTemplate = () => {
  const [text, setText] = useState("Hello World");

  //To call Api, you can set state in arguments
  //and add new properties as follow
  // {response: [], isLogin: true}
  //isLogin is optional state here
  const [demoState, callApi] = useApiCall({
    response: [],
  });

  //first property contain user details
  //second property contain function to set context value/state
  //userContext ={user, isLogin}

  //to set user context
  // const requestAction = {
  //   type: "SAVE_USER_CONTEXT" / "DEL_USER_CONTEXT",
  //   payload: user.response / null,
  // };
  // setUserContext(requestAction);
  const { state: userContext, dispatch: setUserContext } = useUserContext();

  useEffect(() => {
    //making request obj containing url, methood, payload & headers
    const reqData = actionTemplateFunc("arguments");
    async function fetchData() {
      // setting state of reducer to reset values before api call
      const reqState = {
        response: null,
        error: "",
        //if there is optional state and wants to change value
        isLogin: false,
      };
      //arg1 = request obj from action
      //arg2 = req state to reset state before api call
      //arg3 = change value of optional state, if exists
      //calling api
      //   await callApi(reqData, reqState, { isLogin: true });
    }
    fetchData();
  });

  return (
    <MainWrapper>
      <h1>{text}</h1>
    </MainWrapper>
  );
};

export default ComponentTemplate;
