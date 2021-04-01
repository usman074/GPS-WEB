import React, { useEffect, useState } from "react";
import { List } from "antd";
import {
  LanguageListContainer,
  ListContainer
} from "../style";
import { Button } from "../../common";
import languages from 'language-list';
import {useAuthContext} from '../../../providers/AuthProvider';

export const LanguageList = () => {
  const langList = languages().getData()
  const {state, dispatch} = useAuthContext();
  const [selectedLang, setSelectedLang] = useState(null);
  const changeLanguage = (code)=> {
    console.log(code)
  }

  useEffect(()=> {
    if (state && state.user) {
      setSelectedLang(state.user.language);
    }
  },[state])

  return (
    <LanguageListContainer>
      <List
        size="large"
        bordered
        dataSource={langList}
        bordered={false}
        split={false}
        renderItem={(item) => (
          <List.Item className={`${selectedLang === item.code ? "selected" : ""}`} onClick={()=> setSelectedLang(item.code)}>
            {item.language}
          </List.Item>
        )}
      />
      <Button className="change-lang-button" name={"Save language"} onClick={()=> changeLanguage()} />
    </LanguageListContainer>
  );
};

export const SelectedLang = () => {
  const {state, dispatch} = useAuthContext();

  const [selectedLang, setSelectedLang] = useState(null);
  useEffect(()=> {
    if (state && state.user) {
      setSelectedLang(state.user.language);
    }
  },[state])
  return (
    <ListContainer className="lang-list">
      <Button className="user-list-button" name={"Current Language"} />
      {selectedLang && <div className="usersListWrapper">
        <p className="lang-name">{selectedLang}</p>
      </div>}
    </ListContainer>
  );
};
