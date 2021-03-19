import React from "react";
import { CreateUserContainer,  ListContainer } from "../style";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Button } from "../../common";



export const CreateUser = () => {

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
          <Input
            className="create-user-input"
            name="name"
            placeholder="Hello"
            type="text"
          />

          <p className="label">Username</p>
          <Input
            className="create-user-input"
            name="username"
            placeholder="hello@Sample.com"
            type="text"
          />

          <p className="label">Email</p>
          <Input
            className="create-user-input"
            name="email"
            placeholder="hello@Sample.com"
            type="text"
          />

          <p className="label">Password</p>
          <Input
            className="create-user-input"
            name="password"
            type="password"
            placeholder="********"
          />

          <p className="label">Confirm Password</p>
          <Input
            className="create-user-input"
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
  );
};

export const UsersList = () => {
    const usersList = [
        "usman",
        "usman",
        "usman",
        "usman",
        "usman",
        "usman",
        "usman",
      ];
      
      return (
        <ListContainer>
        <Button className="user-list-button" name={"Users List"} />
        {usersList.map((users, index) => (
          <div className="usersListWrapper">
            <p>{index}.</p>
            <p className="user-name">{users}</p>
            <div className="user-list-icons">
              <EditOutlined style={{color: 'white', background: '#03F346', borderRadius: '0.5rem', padding: '0.3rem', marginRight: '0.3rem' }} />
              <DeleteOutlined style={{color: 'white', background: '#F30303', borderRadius: '0.5rem', padding: '0.3rem' }} />
            </div>
          </div>
        ))}
      </ListContainer>
      )
};
