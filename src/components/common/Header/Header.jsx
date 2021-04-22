import React from "react";
import { Button } from "../index";
import { HeaderWrapper } from "./style";
import { UploadOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useVehicleContext } from "../../../providers/VehicleProvider";

export const Header = ({ setIsLogin, setToken }) => {
  const location = useLocation();
  const { dispatch } = useAuthContext();
  const { pathname } = location;
  const history = useHistory();
  const changeScreen = (name) => {
    history.replace(name);
  };
  const { dispatch: vehicleDispatch } = useVehicleContext();

  const logout = () => {
    setToken(null);
    dispatch({ type: "DEL_USER", payload: null });
    vehicleDispatch({ type: "INITIALIZE_DATA", payload: [] });
    vehicleDispatch({ type: "UPDATE_SELECTED_VEHICLE", payload: [] });
    localStorage.removeItem("uid");
    setIsLogin(false);
  };

  return (
    <HeaderWrapper>
      <Space size={90}>
        <Button
          name="Dashboard"
          className={`header-buttons ${
            pathname === "/dashboard" ? "active" : ""
          }`}
          clickEvent={() => changeScreen("/dashboard")}
        />
        <Button
          name="Interval"
          className={`header-buttons ${
            pathname === "/interval" ? "active" : ""
          }`}
          clickEvent={() => changeScreen("/interval")}
        />
        <Button
          name="Settings"
          className={`header-buttons ${
            pathname === "/settings/user" ||
            pathname === "/settings/language" ||
            pathname === "/settings/terms"
              ? "active"
              : ""
          }`}
          clickEvent={() => changeScreen("/settings/user")}
        />
      </Space>
      <span onClick={() => logout()}>
        <UploadOutlined style={{ color: "red" }} /> <p>Log Out</p>
      </span>
    </HeaderWrapper>
  );
};
