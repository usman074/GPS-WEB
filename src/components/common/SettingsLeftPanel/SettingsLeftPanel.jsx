import React from "react";
import { Button } from "../index";
import { Space } from "antd";
import {ContentWrapper} from './style'


export const SettingsLeftPanel = ({gridArea}) => {
  return (
    <ContentWrapper gridArea={gridArea}>
      <Button name="Create User" className="settings-buttons active" />
      <Button name="Change Language" className="settings-buttons" />
      <Button name="Update Term & Condition" className="settings-buttons" />
    </ContentWrapper>
  );
};
