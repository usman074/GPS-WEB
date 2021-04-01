import React, { useState, useEffect } from "react";
import { TermsContentWrapper } from "../style";
import { Button } from "../../common";
import { Input } from "antd";
import { useTermsContext } from "../../../providers/TermsProvider";
import { generateTermsDocument, getTermsDocument, updateTermsDocument } from "../../../firebase";

export const TermsScreen = () => {
  const { TextArea } = Input;
  const { state, dispatch } = useTermsContext();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTerms, setEditedTerms] = useState("");

  
  useEffect(() => {
    const initializeTerms = async () => {
      const { termsConditions } = await generateTermsDocument();
      dispatch({ type: "INITIALIZE_TERMS", payload: termsConditions });
    };
    initializeTerms();
  }, []);

  const onTermsChange = (e) => {
    setEditedTerms(e.target.value);
  };

  const onTermsSubmit = async () => {
    if (!isEdit) {
      setIsEdit(!isEdit);
    } else {
      const update = await updateTermsDocument(editedTerms);
      dispatch({ type: "UPDATE_TERMS", payload: editedTerms });
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
