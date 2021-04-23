import React from "react";
import { Button } from "../index";
import {ContentWrapper} from './style'
import { useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";
import {English, German} from '../../../language.json';


export const SettingsLeftPanel = ({gridArea}) => {
  const history = useHistory()
  const location = useLocation();
  const {pathname} = location;
  const { state } = useAuthContext();

  return (
    <ContentWrapper gridArea={gridArea}>
      <Button name={state.user?.language === 'English'? English.CREATE_USER: German.CREATE_USER} className={`settings-buttons ${(pathname === '/settings/user' || pathname === '/settings/user/edit')? 'active': ''}`} clickEvent={()=> history.replace('/settings/user')} />
      <Button name={state.user?.language === 'English'? English.CHANGE_LANGUAGE: German.CHANGE_LANGUAGE} className={`settings-buttons ${pathname === '/settings/language'? 'active': ''}`} clickEvent={()=> history.replace('/settings/language')} />
      <Button name={state.user?.language === 'English'? English.UPDATE_TERMS_AND_CONDITIONS: German.UPDATE_TERMS_AND_CONDITIONS} className={`settings-buttons ${(pathname === '/settings/terms' || pathname === '/settings/terms/edit')? 'active': ''}`} clickEvent={()=> history.replace('/settings/terms')} />
    </ContentWrapper>
  );
};
