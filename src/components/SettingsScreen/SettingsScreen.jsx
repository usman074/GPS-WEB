import React from "react";
import { SettingsLeftPanel} from "../common";
import {
  ContentWrapper,
} from "./style";
import {CreateUser, UsersList} from './UserScreen/UserScreen';
import {LanguageList, SelectedLang} from './LanguageScreen/LanguageScreen';
import {TermsScreen} from './TermsScreen/TermsScreen';
import { useLocation } from "react-router-dom";

export const SettingsScreen = () => {
  const location = useLocation();
  const { pathname } = location;

  const rendererComponent = {
    '/settings/user': {
      middleComp: <CreateUser />,
      rightComp: <UsersList />
    },
    '/settings/user/edit': {
      middleComp: <CreateUser />,
      rightComp: <UsersList />
    },
    '/settings/language': {
      middleComp: <LanguageList />,
      rightComp: <SelectedLang />
    },
    '/settings/terms': {
      middleComp: <TermsScreen />,
      rightComp: null
    },
    '/settings/terms/edit': {
      middleComp: <TermsScreen />,
      rightComp: null
    }
  }
  return (
    <ContentWrapper>
      <SettingsLeftPanel gridArea="leftPanel" />
      <div className="vlOne"></div>
        {pathname && rendererComponent[pathname].middleComp}
      <div className="vlTwo"></div>
      {pathname && rendererComponent[pathname].rightComp}
    </ContentWrapper>
  );
};
