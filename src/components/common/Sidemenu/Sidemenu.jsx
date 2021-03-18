import React from "react";
import { DrawerStyled } from "./style";
import { Button } from "../index";

export const Sidemenu = () => {
  const x = [
    "Fm 113 / OW 652 Cs",
    "Fm 113 / OW 652 Cs",
    "Fm 113 / OW 652 Cs",
    "Fm 113 / OW 652 Cs",
  ];
  const vehicles = [...x, ...x, ...x, ...x, ...x]
  return (
    <DrawerStyled
      title="WEB GPS"
      placement="left"
      closable={false}
      visible={true}
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
      {vehicles.map((vehicle, index) => (
        <Button key={index} className="vehicles" name={vehicle} />
      ))}
      {/* //   <p>Some contents...</p>
    //   <p>Some contents...</p>
    //   <p>Some contents...</p> */}
    </DrawerStyled>
  );
};
