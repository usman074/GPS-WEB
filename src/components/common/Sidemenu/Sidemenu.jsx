import React, { useEffect, useState } from "react";
import { DrawerStyled } from "./style";
import { Button } from "../index";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useVehicleContext } from "../../../providers/VehicleProvider";
import { firestore, getIntervalDocument } from "../../../firebase";
import { Checkbox } from "antd";
import {English, German} from '../../../language.json';

export const Sidemenu = ({ isLogin }) => {
  const [timeInterval, setTimeInterval] = useState(0);
  const [checkAll, setCheckAll] = useState(true);
  const { state } = useAuthContext();
  const {
    state: vehicleState,
    dispatch: vehicleDispatch,
  } = useVehicleContext();

  const getVehiclesCall = async () => {
    const vehicleListApiCall = await firestore
      .collection(`vehicles`)
      .where("adminId", "==", state.user.uid)
      .get();
    let vehiclesList = [];
    vehicleListApiCall.forEach((doc) => {
      vehiclesList = [...vehiclesList, { ...doc.data(), uid: doc.id }];
    });
    vehicleDispatch({ type: "INITIALIZE_DATA", payload: vehiclesList });
  };

  useEffect(() => {
    // const getVehiclesCall = async () => {
    //   await firestore
    //     .collection(`vehicles`)
    //     .where("adminId", "==", state.user.uid)
    //     .onSnapshot((querySnapshot) => {
    //       let vehiclesList = [];
    //       querySnapshot.forEach((doc) => {
    //         vehiclesList = [...vehiclesList, { ...doc.data(), uid: doc.id }];
    //       });
    //       vehicleDispatch({ type: "INITIALIZE_DATA", payload: vehiclesList });
    //     });
    // };
    if (state.user) getVehiclesCall();
  }, [state]);

  useEffect(() => {
    const initializeIntervalDoc = async () => {
      const intervalDoc = await getIntervalDocument("123456789");
      if (intervalDoc.refreshInterval.type === "min") {
        setTimeInterval(intervalDoc.refreshInterval.value * 60000);
      } else {
        setTimeInterval(intervalDoc.refreshInterval.value * 60 * 60000);
      }
    };
    if (state.user) initializeIntervalDoc();
  }, [state]);

  const onChangeVehicle = (vehcile) => {
    vehicleDispatch({ type: "UPDATE_SELECTED_VEHICLE", payload: vehcile });
  };

  useEffect(() => {
    setCheckAll(
      vehicleState.vehicles.length === vehicleState.selectedVehicle.length
    );
  }, [vehicleState.selectedVehicle]);

  const onCheckAllVehicles = (e) => {
    vehicleDispatch({
      type: "UPDATE_SELECTED_VEHICLE_WITH_OBJ",
      payload: e.target.checked ? vehicleState.vehicles : [],
    });
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (state.user && timeInterval) getVehiclesCall();
    }, timeInterval);

    return () => {
      clearInterval(intervalRef);
    };
  });

  return (
    <DrawerStyled
      title={state.user?.language === 'English'? English.GPS_WEB: German.GPS_WEB}
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
      <Button className="sidemenu-content-heading" name={state.user?.language === 'English'? English.MOBILE_LOCATION: German.MOBILE_LOCATION} />
      <Button
        className="loc-update-btn"
        name={state.user?.language === 'English'? English.UPDATE_LOCATION_NOW: German.UPDATE_LOCATION_NOW}
        clickEvent={getVehiclesCall}
      />
      <Checkbox
        className="vehicles"
        onChange={onCheckAllVehicles}
        checked={checkAll}
      >
        {state.user?.language === 'English'? English.SELECT_ALL_VEHICLES: German.SELECT_ALL_VEHICLES}
      </Checkbox>
      <Checkbox.Group
        value={vehicleState.selectedVehicle}
        onChange={onChangeVehicle}
      >
        {vehicleState.vehicles.map((vehicle) => (
          <div key={vehicle.uid}>
            <Checkbox className="vehicles" value={vehicle.uid}>
              {vehicle.vehicleName}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    </DrawerStyled>
  );
};
