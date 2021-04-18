import React from "react";
import { useVehicleContext } from "../../providers/VehicleProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import GoogleMapReact from 'google-map-react';
import {MarkerIcon} from '../../assets/index';
import {CarNameStyled} from './style';

const AnyReactComponent = ({ text }) => {
  return (
    <div>
      <MarkerIcon/>
      {text && <CarNameStyled>{text}</CarNameStyled>}
    </div>
  )
}

export const Dashboard = () => {
  const { state } = useVehicleContext();


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

  console.log(state)
  return (
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCQkNEL5ocv5x_TfGqgXW-olHr0yeA0N0Q' }}
          center={{lat: state.selectedVehicle? state.selectedVehicle.lat: 30.7438368, lng: state.selectedVehicle? state.selectedVehicle.lng: 73.3308934}}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={state.selectedVehicle? state.selectedVehicle.lat: 30.7438368}
            lng={state.selectedVehicle? state.selectedVehicle.lng: 73.3308934}
            text={state.selectedVehicle && state.selectedVehicle.vehicleName}
          />
        </GoogleMapReact>
      </div>
  )
};