import React, { useReducer, createContext, useContext } from "react";

export const initialState = {
  terms: null,
};

function termsReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIALIZE_TERMS":
      return {
        ...state,
        terms: action.payload,
      };
    default:
      return state;
  }
}

export const termsContext = createContext({
  state: initialState,
  dispatch: undefined,
});

export const useTermsContext = () => useContext(termsContext);

export const TermsProvider = (props) => {
  const [state, dispatch] = useReducer(termsReducer, initialState);

  return (
    <termsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </termsContext.Provider>
  );
};
