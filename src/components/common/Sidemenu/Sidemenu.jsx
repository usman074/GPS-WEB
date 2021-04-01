import React from "react";
import { DrawerStyled } from "./style";
import { Button } from "../index";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useVehicleContext } from "../../../providers/VehicleProvider";

export const Sidemenu = ({ isLogin }) => {
  const { state, dispatch } = useAuthContext();
  const {
    state: vehicleState,
    dispatch: vehicleDispatch,
  } = useVehicleContext();
  // const x = [
  //   "Fm 113 / OW 652 Cs",
  //   "Fm 113 / OW 652 Cs",
  //   "Fm 113 / OW 652 Cs",
  //   "Fm 113 / OW 652 Cs",
  // ];

  const onChangeVehicle = (vehcile)=> {
    vehicleDispatch({type: 'UPDATE_SELECTED_VEHICLE', payload: vehcile});
  }

  return (
    <DrawerStyled
      title={"GPS WEB"}
      placement="left"
      closable={false}
      visible={isLogin}
      mask={false}
      contentWrapperStyle={{ boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)" }}
      headerStyle={{
        border: "none",
        background: "#464646",
        height: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      bodyStyle={{
        background: "#F8F8F8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button className="sidemenu-content-heading" name="Mobile location" />
      {vehicleState.vehicles.map((vehicle) => (
        <Button
          key={vehicle.uid}
          className={`vehicles ${
            vehicle.uid === vehicleState.selectedVehicle.uid
              ? "selected-vehicle"
              : ""
          }`}
          name={vehicle.vehicleName}
          clickEvent={()=> onChangeVehicle(vehicle)}
        />
      ))}
      {/* //   <p>Some contents...</p>
    //   <p>Some contents...</p>
    //   <p>Some contents...</p> */}
    </DrawerStyled>
  );
};
