import React, { useEffect } from "react";
import { useVehicleContext } from "../../providers/VehicleProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { firestore } from "../../firebase";
import GoogleMapReact from 'google-map-react';
import {MarkerIcon} from '../../assets/index';
import {CarNameStyled} from './style';

const AnyReactComponent = ({ text }) => {
  return (
    <div>
      <MarkerIcon/>
      <CarNameStyled>{text}</CarNameStyled>
    </div>
  )
}

export const Dashboard = () => {
  const { state, dispatch } = useVehicleContext();
  const { state: authState } = useAuthContext();


// const loadStaticMap = ()=> {
//   if (state.selectedVehicle) {
//     const {lat, lng} = state.selectedVehicle;
//     const mapKey = 'AIzaSyC60nn_VZXJTxtmWuIB9SnHGU6USDb1LGo';
//     let url = 'https://maps.googleapis.com/maps/api/staticmap?center='
//       + lat + ',' + lng + '&zoom=20&size=1000x500&markers=color:red|' + lat
//       + ',' + lng + '&key=' + mapKey;
//     return url;
//   }
// }

  useEffect(() => {
    const getVehiclesCall = async () => {
      await firestore
        .collection(`vehicles`)
        .where("adminId", "==", authState.user.uid)
        .onSnapshot((querySnapshot) => {
          let vehiclesList = [];
          querySnapshot.forEach((doc) => {
            vehiclesList = [...vehiclesList, { ...doc.data(), uid: doc.id }];
          });
          dispatch({ type: "INITIALIZE_DATA", payload: vehiclesList });
        });
    };
    if (authState.user) getVehiclesCall();
  }, [authState]);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
        {state.selectedVehicle && <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCQkNEL5ocv5x_TfGqgXW-olHr0yeA0N0Q' }}
          defaultCenter={{lat: state.selectedVehicle.lat, lng: state.selectedVehicle.lng}}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={state.selectedVehicle.lat}
            lng={state.selectedVehicle.lng}
            text={state.selectedVehicle.vehicleName}
          />
        </GoogleMapReact>}
      </div>
  )
};