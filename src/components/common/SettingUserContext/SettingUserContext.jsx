import React, { useEffect } from "react";
import { getUserDocument } from "../../../firebase";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useHistory } from "react-router-dom";

export const SettingUserContext = ({ setIsLogin }) => {
  const token = localStorage.getItem("uid");
  const { dispatch } = useAuthContext();
  const history = useHistory();
  const { location:{pathname} } = history;

  useEffect(() => {
    async function getUserFromToken() {
      try {
        const userDoc = await getUserDocument(token);
        if (userDoc.isAdmin) {

          dispatch({ type: "SAVE_USER", payload: userDoc });
          if (pathname === '/') {
              history.replace('/dashboard')
          }
          setIsLogin(true);
        } else {
          localStorage.removeItem("uid");
          setIsLogin(false);
          history.replace('/login')
        }
      } catch (error) {
        console.log("error", error);
        localStorage.removeItem("uid");
        dispatch({ type: "DEL_USER", payload: null });
        setIsLogin(false);
        history.replace('/login')
      }
    }
    if (token) getUserFromToken();
  }, [token]);

  return null;
};
