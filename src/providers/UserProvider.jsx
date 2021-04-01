import React, { useReducer, createContext, useContext } from "react";

export const initialState = {
  users: [],
  currentUser: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIALIZE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DEL_USER":
      return {
        ...state,
        users: [...state.users.filter((user) => user.uid !== action.uid)],
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: state.users.filter((user) => user.uid === action.uid)[0],
      };
    case "EDIT_USER":
      return {
        ...state,
        currentUser: null,
        users: state.users.map((user) => {
          if (user.uid === action.uid) {
            return { ...user, ...action.payload };
          }
          return user;
        }),
      };

    default:
      return state;
  }
}

export const userContext = createContext({
  state: initialState,
  dispatch: undefined,
});

export const useUserContext = () => useContext(userContext);

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {props.children}
    </userContext.Provider>
  );
};
