import React, { useEffect, useState } from "react";
import { useVehicleContext } from "../../providers/VehicleProvider";
import GoogleMapReact from "google-map-react";
import { MarkerIcon } from "../../assets/index";
import { CarNameStyled } from "./style";

const AnyReactComponent = ({ text }) => {
  return (
    <div>
      <MarkerIcon />
      {text && <CarNameStyled>{text}</CarNameStyled>}
    </div>
  );
};

export const Dashboard = () => {
  const { state } = useVehicleContext();
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [centerCoord, setCenterCoord] = useState({lat: 0, lng: 0});
  useEffect(() => {
    const filterVehicles = state.vehicles.filter((vehicle) =>
      state.selectedVehicle.includes(vehicle.uid)
    );
    const latVal = filterVehicles.length && filterVehicles.reduce((acc, curr)=> acc + curr.lat
    ,0)
    const lngVal = filterVehicles.length && filterVehicles.reduce((acc, curr)=> acc + curr.lng, 0)
    {filterVehicles.length && setCenterCoord({lat: latVal/filterVehicles.length, lng: lngVal/filterVehicles.length })}
    setSelectedVehicles(filterVehicles);
  }, [state]);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCQkNEL5ocv5x_TfGqgXW-olHr0yeA0N0Q" }}
        center={{
          lat:  selectedVehicles.length? centerCoord.lat: 30.7438368,
          lng: selectedVehicles.length? centerCoord.lng: 73.3308934,
        }}
        defaultZoom={11}
      >
        {selectedVehicles.map((vehicle) => (
          <AnyReactComponent
            key={vehicle.uid}
            lat={vehicle.lat}
            lng={vehicle.lng}
            text={vehicle && vehicle.vehicleName}
          />
        ))}
        {/* { selectedVehicles.length === 0 && <AnyReactComponent
          lat={30.7438368}
          lng={73.3308934}
        />} */}
      </GoogleMapReact>
    </div>
  );
};
