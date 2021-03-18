import React from "react";
import { Button } from "../index";
import { HeaderWrapper } from "./style";
import { UploadOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Space size={90}>
        <Button name="Dashboard" className="header-buttons active" />
        <Button name="Interval" className="header-buttons" />
        <Button name="Settings" className="header-buttons" />
      </Space>
      <span>
        <UploadOutlined style={{color: 'red'}} /> <p>Log Out</p>
      </span>
    </HeaderWrapper>
  );
};
