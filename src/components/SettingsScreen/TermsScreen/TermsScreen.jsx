import React, { useState } from "react";
import { TermsContentWrapper } from "../style";
import { Button } from "../../common";
import { Input } from "antd";

export const TermsScreen = () => {
  const { TextArea } = Input;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <TermsContentWrapper>
      {!isEdit && (
        <p>
          A Terms and Conditions agreement (T&C) outlines and sets forth your
          rules and requirements for people who use your website or mobile app.
          <br />
          <br />
          Topics addressed in a T&C include such things as acceptable behavior
          by users, restricted uses of your service and the maintenance of your
          rights, such as the right to terminate access to people who violate
          your rules. Users must agree to your Terms and Conditions for them to
          be enforceable.
          <br />
          <br />
          Terms and Conditions agreements are also known as Terms of Service or
          Terms of Use agreements. The name doesn't matter, as they all serve
          the same purpose: Protecting your business and keeping your users
          informed.
        </p>
      )}

      {isEdit && (
        <div className="terms-input">
          <TextArea rows={10} placeholder="Write a Text..." />
        </div>
      )}
      <Button
        className="edit-terms-button"
        name={isEdit ? "Update" : "Edit"}
        clickEvent={() => setIsEdit(!isEdit)}
      />
    </TermsContentWrapper>
  );
};
