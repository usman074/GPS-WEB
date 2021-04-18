import React, {useEffect, useState} from "react";
import { DrawerStyled } from "./style";
import { Button } from "../index";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useVehicleContext } from "../../../providers/VehicleProvider";
import { firestore, getIntervalDocument } from "../../../firebase";
import { useHistory } from "react-router-dom";

export const Sidemenu = ({ isLogin }) => {
  const history = useHistory();
  const [timeInterval, setTimeInterval] = useState(0);
  const { state } = useAuthContext();
  const {
    state: vehicleState,
    dispatch: vehicleDispatch,
  } = useVehicleContext();

  const getVehiclesCall = async () => {
    console.log('console 2')

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

  useEffect(()=> {
    const initializeIntervalDoc = async ()=> {
      const intervalDoc = await getIntervalDocument("123456789");
      if(intervalDoc.refreshInterval.type === 'min') {
        setTimeInterval(intervalDoc.refreshInterval.value * 60000)
      } else {
        setTimeInterval(intervalDoc.refreshInterval.value * 60 * 60000)
      }
    }
    if (state.user) initializeIntervalDoc();
  },[state])

  const onChangeVehicle = (vehcile) => {
    vehicleDispatch({ type: "UPDATE_SELECTED_VEHICLE", payload: vehcile });

    history.replace('/dashboard');
  };

  useEffect(()=> {
    const intervalRef = setInterval(()=> {
      console.log('console 1')
      if (state.user && timeInterval) getVehiclesCall();
    }, timeInterval)

    return ()=> {
      clearInterval(intervalRef)
    }
  })

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
          // clickEvent={() => onChangeVehicle(vehicle)}
        />
      ))}
     
    </DrawerStyled>
  );
};
