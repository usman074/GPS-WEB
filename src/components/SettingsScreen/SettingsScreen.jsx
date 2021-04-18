import React, { useState } from "react";
import { SettingsLeftPanel } from "../common";
import { ContentWrapper } from "./style";
import { CreateUser, UsersList } from "./UserScreen/UserScreen";
import { LanguageList, SelectedLang } from "./LanguageScreen/LanguageScreen";
import { TermsScreen } from "./TermsScreen/TermsScreen";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";

export const SettingsScreen = () => {
  const location = useLocation();
  const { pathname } = location;
  const [isLoading, setIsLoading] = useState(false);

  const rendererComponent = {
    "/settings/user": {
      middleComp: <CreateUser setIsLoading={setIsLoading} />,
      rightComp: <UsersList setIsLoading={setIsLoading} />,
    },
    "/settings/user/edit": {
      middleComp: <CreateUser setIsLoading={setIsLoading} />,
      rightComp: <UsersList setIsLoading={setIsLoading} />,
    },
    "/settings/language": {
      middleComp: <LanguageList setIsLoading={setIsLoading} />,
      rightComp: <SelectedLang setIsLoading={setIsLoading} />,
    },
    "/settings/terms": {
      middleComp: <TermsScreen setIsLoading={setIsLoading} />,
      rightComp: null,
    },
    "/settings/terms/edit": {
      middleComp: <TermsScreen setIsLoading={setIsLoading} />,
      rightComp: null,
    },
  };
  return isLoading ? (
    <Loader
      type="Oval"
      color="#464646"
      height={100}
      width={100}
      visible={true}
    />
  ) : (
    <ContentWrapper>
      <SettingsLeftPanel gridArea="leftPanel" />
      <div className="vlOne"></div>
      {pathname && rendererComponent[pathname].middleComp}
      <div className="vlTwo"></div>
      {pathname && rendererComponent[pathname].rightComp}
    </ContentWrapper>
  );
};
