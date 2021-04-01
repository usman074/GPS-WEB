import React, { useReducer, createContext, useContext } from "react";

export const initialState = {
  interval: null,
};

export const intervalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_INTERVAL":
      return {
        ...state,
        interval: action.payload,
      };
    case "UPDATE_INTERVAL":
      return {
        ...state,
        interval: action.payload,
      };
    default:
      return state;
  }
};

export const intervalContext = createContext({
  state: initialState,
  dispatch: undefined,
});

export const useIntervalContext = () => useContext(intervalContext);

export const IntervalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(intervalReducer, initialState);

  return (
    <intervalContext.Provider value={{state, dispatch}}>
      {children}
    </intervalContext.Provider>
  );
};
