import React, { useState, useEffect } from "react";
import { TermsContentWrapper } from "../style";
import { Button } from "../../common";
import { Input } from "antd";
import { useTermsContext } from "../../../providers/TermsProvider";
import { getTermsDocument, updateTermsDocument } from "../../../firebase";

export const TermsScreen = () => {
  const { TextArea } = Input;
  const { state, dispatch } = useTermsContext();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTerms, setEditedTerms] = useState("");

  
  useEffect(() => {
    const initializeTerms = async () => {
      const { termsConditions } = await getTermsDocument();
      // console.log('terms', terms)
      dispatch({ type: "INITIALIZE_TERMS", payload: termsConditions });
    };
    initializeTerms();
  }, []);

  const onTermsChange = (e) => {
    console.log(e);
    setEditedTerms(e.target.value);
  };

  const onTermsSubmit = async () => {
    if (!isEdit) {
      setIsEdit(!isEdit);
    } else {
      console.log(editedTerms);
      const update = await updateTermsDocument(editedTerms);
      dispatch({ type: "INITIALIZE_TERMS", payload: editedTerms });
      setIsEdit(!isEdit);
    }
  };

  return (
    <TermsContentWrapper>
      {!isEdit && (
        <p>{state.terms ? state.terms : "No Terms & Conditions"}</p>
      )}

      {isEdit && (
        <div className="terms-input">
          <TextArea
            rows={10}
            placeholder="Write a Text..."
            defaultValue={state.terms}
            onChange={onTermsChange}
          />
        </div>
      )}
      <Button
        className="edit-terms-button"
        name={isEdit ? "Update" : "Edit"}
        clickEvent={() => onTermsSubmit()}
      />
    </TermsContentWrapper>
  );
};
