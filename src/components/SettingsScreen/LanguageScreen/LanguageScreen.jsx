import React, { useState } from "react";
import { List } from "antd";
import {
  LanguageListContainer,
  ListContainer
} from "../style";
import { Button } from "../../common";

export const LanguageList = () => {
  const langList = [
    "Bosnian",
    "Croatian",
    "standard",
    "Serbian",
    "Slovenian",
    "German",
    "Turkish",
    "Hungarian",
    "English",
  ];
  const [selectedLang, setSelectedLang] = useState("English");
  return (
    <LanguageListContainer>
      <List
        size="large"
        bordered
        dataSource={langList}
        bordered={false}
        split={false}
        renderItem={(item) => (
          <List.Item className={`${selectedLang === item ? "selected" : ""}`}>
            {item}
          </List.Item>
        )}
      />
      <Button className="change-lang-button" name={"Save language"} />
    </LanguageListContainer>
  );
};

export const SelectedLang = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  return (
    <ListContainer className="lang-list">
      <Button className="user-list-button" name={"Current Language"} />
      <div className="usersListWrapper">
        <p className="lang-name">{selectedLang}</p>
      </div>
    </ListContainer>
  );
};
