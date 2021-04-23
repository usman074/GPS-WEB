import React, { useEffect, useState } from "react";
import { List } from "antd";
import { LanguageListContainer, ListContainer } from "../style";
import { Button } from "../../common";
// import languages from 'language-list';
import { useAuthContext } from "../../../providers/AuthProvider";
import { updateLanguage } from "../../../firebase";
import {English, German} from '../../../language.json';

export const LanguageList = () => {
  // const langList = languages().getData()
  const langList = ["English", "German"];
  const { state, dispatch } = useAuthContext();
  const [selectedLang, setSelectedLang] = useState(null);
  const changeLanguage = () => {
    const updateLang = async () => {
      await updateLanguage({...state.user}, selectedLang);
      dispatch({type: 'UPDATE_LANG', payload: selectedLang})
    };
    if (state.user) updateLang();
  };

  useEffect(() => {
    if (state && state.user) {
      setSelectedLang(state.user.language);
    }
  }, [state]);

  return (
    <LanguageListContainer>
      <List
        size="large"
        bordered
        dataSource={langList}
        bordered={false}
        split={false}
        renderItem={(item) => (
          <List.Item
            className={`${selectedLang === item ? "selected" : ""}`}
            onClick={() => setSelectedLang(item)}
          >
            {item}
          </List.Item>
        )}
      />
      <Button
        className="change-lang-button"
        name={state.user?.language === 'English'? English.SAVE_LANGUAGE: German.SAVE_LANGUAGE}
        clickEvent={changeLanguage}
      />
    </LanguageListContainer>
  );
};

export const SelectedLang = () => {
  const { state } = useAuthContext();

  const [selectedLang, setSelectedLang] = useState(null);
  useEffect(() => {
    if (state && state.user) {
      setSelectedLang(state.user.language);
    }
  }, [state]);
  return (
    <ListContainer className="lang-list">
      <Button className="user-list-button" name={state.user?.language === 'English'? English.CURRENT_LANGUAGE: German.CURRENT_LANGUAGE} />
      {selectedLang && (
        <div className="usersListWrapper">
          <p className="lang-name">{selectedLang}</p>
        </div>
      )}
    </ListContainer>
  );
};
