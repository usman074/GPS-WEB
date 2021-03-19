import React from "react";
import { Button } from "../index";
import { Space } from "antd";
import {ContentWrapper} from './style'
import { useHistory, useLocation } from "react-router-dom";


export const SettingsLeftPanel = ({gridArea}) => {
  const history = useHistory()
  const location = useLocation();
  const {pathname} = location;

  return (
    <ContentWrapper gridArea={gridArea}>
      <Button name="Create User" className={`settings-buttons ${pathname === '/settings/user'? 'active': ''}`} clickEvent={()=> history.replace('/settings/user')} />
      <Button name="Change Language" className={`settings-buttons ${pathname === '/settings/language'? 'active': ''}`} clickEvent={()=> history.replace('/settings/language')} />
      <Button name="Update Term & Condition" className={`settings-buttons ${pathname === '/settings/terms'? 'active': ''}`} clickEvent={()=> history.replace('/settings/terms')} />
    </ContentWrapper>
  );
};
