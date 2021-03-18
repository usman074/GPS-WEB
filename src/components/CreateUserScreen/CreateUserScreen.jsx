import React from "react";
import { SettingsLeftPanel, Input, Button } from "../common";
import { ContentWrapper, CreateUserContainer } from "./style";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export const CreateUserScreen = () => {
  const validateCreateUserForm = () => {
    return Yup.object({
      name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      confirmPassword: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    });
  };

  const handleCreateUserForm = (values) => {
    console.log(values);
  };

  return (
    <ContentWrapper>
      <SettingsLeftPanel gridArea="options" />
      <div className="vlOne"></div>
      <CreateUserContainer>
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validateCreateUserForm}
          onSubmit={handleCreateUserForm}
        >
          <Form>
            <p className="label">Name</p>
            <Input className="create-user-input" name="name" placeholder="Hello" type="text" />

            <p className="label">Username</p>
            <Input className="create-user-input" name="username" placeholder="hello@Sample.com" type="text" />

            <p className="label">Email</p>
            <Input className="create-user-input" name="email" placeholder="hello@Sample.com" type="text" />

            <p className="label">Password</p>
            <Input className="create-user-input" name="password" type="password" placeholder="********" />

            <p className="label">Confirm Password</p>
            <Input className="create-user-input"
              name="confirmPassword"
              type="password"
              placeholder="********"
            />

            <Button
              className="create-user-button"
              type="submit"
              name={"Create"}
            />
          </Form>
        </Formik>
      </CreateUserContainer>
          
      <div className="vlTwo"></div>

    </ContentWrapper>
  );
};
