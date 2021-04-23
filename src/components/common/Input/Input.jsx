import React from "react";
import { StyledInput, InputWrapper } from "./style";
import { useField } from "formik";

export const Input = ({
  placeholder,
  customStyle,
  type = "text",
  disabled = false,
  className,
  mainClassName = "",
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <InputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="error">{meta.error}</p>
      ) : null}
    </InputWrapper>
  );
};
