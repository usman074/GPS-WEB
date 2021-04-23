import React, { createContext, useReducer, useContext } from "react";

export const initialState = {
  user: null,
  isLogin: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };

    case "UPDATE_LANG":
      return {
        ...state,
        user: {...state.user, language: action.payload},
        isLogin: false,
      };

    case "DEL_USER":
      return {
        ...state,
        user: action.payload,
        isLogin: false,
      };
    default:
      return state;
  }
}

export const authContext = createContext({
  state: initialState,
  dispatch: undefined,
});

export const useAuthContext = () => useContext(authContext);

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {props.children}
    </authContext.Provider>
  );
};
