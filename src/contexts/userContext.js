import React, { useReducer } from "react";
export const initialState = {
  user: null,
  isLogin: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_USER_CONTEXT":
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };

    case "DEL_USER_CONTEXT":
      return {
        ...state,
        user: action.payload,
        isLogin: false,
      };
    default:
      return state;
  }
}

const userContext = React.createContext({
  state: initialState,
  dispatch: undefined,
});

// export const useUserContext = React.useContext(userContext);

export const useUserContext = () => React.useContext(userContext);

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {props.children}
    </userContext.Provider>
  );
};
