import React, { useReducer, createContext, useContext } from "react";

const initialState = {
  vehicles: [],
  selectedVehicle: null,
};

export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_DATA":
      return {
        ...state,
        vehicles: action.payload,
        selectedVehicle: action.payload[0],
      };
    case "UPDATE_SELECTED_VEHICLE":
      return {
        ...state,
        selectedVehicle: action.payload,
      };
  }
};

export const vehicleContext = createContext({
  state: initialState,
  dispatch: undefined,
});

export const useVehicleContext = () => useContext(vehicleContext);

export const VehicleProider = ({ children }) => {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  return (
    <vehicleContext.Provider value={{ state, dispatch }}>
      {children}
    </vehicleContext.Provider>
  );
};
