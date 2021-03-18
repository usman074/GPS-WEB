import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "../common";
import { LoginWrapper, LoginContainer } from "./style";
export const LoginScreen = () => {
  const validateLoginForm = () => {
    return Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    });
  };

  const handleLoginForm = (values) => {
    console.log(values);
  };
  return (
    <LoginWrapper>
      <LoginContainer>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validateLoginForm}
          onSubmit={handleLoginForm}
        >
          <Form>
            <h1 className="page-heading">Welcome To GPS Web</h1>
            <h1 className="form-heading">Sign In</h1>

            <p className="label">Email</p>
            <Input name="email" placeholder="hello@Sample.com" type="text" />

            <p className="label">Password</p>
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
            />

            <Button className="login-button" type="submit" name={"Sign In"} />
          </Form>
        </Formik>
      </LoginContainer>
    </LoginWrapper>
  );
};
