import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";

export const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { state } = useAuthContext();

  const { user, isLogin } = state;

  const token = localStorage.getItem("uid");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token || (user && user.isAdmin && isLogin)) {
          return Component ? <Component {...props} /> : render(props);
        } 
        else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    ></Route>
  );
};

export default ProtectedRoute;
