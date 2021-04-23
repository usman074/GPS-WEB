import React, { useState, useEffect } from "react";
import { TermsContentWrapper } from "../style";
import { Button } from "../../common";
import { Input } from "antd";
import { useTermsContext } from "../../../providers/TermsProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import { generateTermsDocument, updateTermsDocument } from "../../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import {English, German} from '../../../language.json';

export const TermsScreen = ({setIsLoading}) => {
  const { state: authState } = useAuthContext();
  const { TextArea } = Input;
  const { state, dispatch } = useTermsContext();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTerms, setEditedTerms] = useState("");

  const location = useLocation();
  const {pathname} = location;
  const history = useHistory();

  
  useEffect(() => {
    const initializeTerms = async () => {
      const { termsConditions } = await generateTermsDocument();
      dispatch({ type: "INITIALIZE_TERMS", payload: termsConditions });
      if (isEdit) {
        
      }
    };
    initializeTerms();
  }, []);

  useEffect(()=> {
    if(pathname.includes('edit')) {
      setIsEdit(!isEdit);
      setEditedTerms(state.terms)
    } 
  },[pathname])


  const onTermsChange = (e) => {
    setEditedTerms(e.target.value);
  };

  const onTermsSubmit = async () => {
    if (!isEdit) {
      // setIsEdit(!isEdit);
      history.replace('/settings/terms/edit')
    } else {
      setIsLoading(true)
      const update = await updateTermsDocument(editedTerms);
      dispatch({ type: "UPDATE_TERMS", payload: editedTerms });
      // setIsEdit(!isEdit);
      setIsLoading(false)
      history.replace('/settings/terms')

    }
  };

  return (
    <TermsContentWrapper>
      {!isEdit && (
        <p>{state.terms ? state.terms : state.user?.language === 'English'? English.NO_TERMS_AND_CONDITIONS: German.NO_TERMS_AND_CONDITIONS}</p>
      )}

      {isEdit && (
        <div className="terms-input">
          <TextArea
            rows={10}
            placeholder={state.user?.language === 'English'? English.WRITE_TEXT: German.WRITE_TEXT}
            defaultValue={state.terms}
            onChange={onTermsChange}
          />
        </div>
      )}
      <Button
        className="edit-terms-button"
        name={isEdit ? (state.user?.language === 'English'? English.UPDATE: German.UPDATE): state.user?.language === 'English'? English.EDIT: German.EDIT}
        clickEvent={() => onTermsSubmit()}
      />
    </TermsContentWrapper>
  );
};
