import React, { useEffect, useState } from "react";
import { CreateUserContainer, ListContainer } from "../style";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DeleteOutlined } from "@ant-design/icons";
import { Input, Button } from "../../common";
import { FaRegEdit } from "@react-icons/all-files/fa/FaRegEdit";
import {
  auth,
  generateUserDocument,
  getUsersList,
  updateUserDocument,
  getUserDocument,
  delUserVehicleDocument,
} from "../../../firebase";
import { useUserContext } from "../../../providers/UserProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useHistory, useLocation } from "react-router-dom";

export const CreateUser = ({ setIsLoading }) => {
  const { state, dispatch } = useUserContext();
  const {
    state: { user },
  } = useAuthContext();
  const [uid, setUid] = useState(null);
  const { currentUser } = state;

  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  useEffect(() => {
    if (pathname.includes("edit") && !currentUser) {
      history.replace("/settings/user");
    } else if (pathname === "/settings/user" && currentUser) {
      dispatch({ type: "CURRENT_USER", uid: null });
    }
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);
  const validateCreateUserForm = () => {
    if (currentUser) {
      return Yup.object({
        name: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      });
    } else {
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
    }
  };

  const handleCreateUserForm = async (values, actions) => {
    try {
      if (currentUser) {
        const editedData = {
          name: values.name,
          email: values.email,
          username: values.username,
          isAdmin: false,
          adminId: uid,
        };
        setIsLoading(true);
        const userDoc = await updateUserDocument({
          ...editedData,
          uid: currentUser.uid,
        });
        if (userDoc) {
          dispatch({
            type: "EDIT_USER",
            payload: editedData,
            uid: currentUser.uid,
          });
          setIsLoading(false);
        }
      } else {
        const { user } = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        setIsLoading(true);
        const userDoc = await generateUserDocument(user, {
          name: values.name,
          username: values.username,
          isAdmin: false,
          adminId: uid,
          isActive: true,
        });
        dispatch({ type: "ADD_USER", payload: userDoc });
        setIsLoading(false);
      }
      actions.resetForm();
    } catch (error) {}
  };

  return (
    <CreateUserContainer>
      <Formik
        initialValues={
          currentUser
            ? currentUser
            : {
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }
        }
        validationSchema={validateCreateUserForm}
        onSubmit={handleCreateUserForm}
        enableReinitialize
      >
        <Form>
          <p className="label">Name</p>
          <Input
            className="create-user-input"
            name="name"
            type="text"
          />

          <p className="label">Username</p>
          <Input
            className="create-user-input"
            name="username"
            type="text"
          />

          <p className="label">Email</p>
          <Input
            className="create-user-input"
            name="email"
            type="text"
            disabled={currentUser ? true : false}
          />

          {!currentUser && (
            <>
              <p className="label">Password</p>
              <Input
                className="create-user-input"
                name="password"
                type="password"
              />

              <p className="label">Confirm Password</p>
              <Input
                className="create-user-input"
                name="confirmPassword"
                type="password"
              />
            </>
          )}

          <Button
            className="create-user-button"
            type="submit"
            name={currentUser ? "Update" : "Create"}
          />
        </Form>
      </Formik>
    </CreateUserContainer>
  );
};

export const UsersList = ({ setIsLoading }) => {
  const history = useHistory();
  const { state, dispatch } = useUserContext();
  const { users: usersList } = state;

  const [uid, setUid] = useState(null);
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const callApi = async () => {
      let users = await getUsersList();
      users = users.filter((user) => user.isActive);
      dispatch({ type: "INITIALIZE_USERS", payload: users });
    };
    callApi();
  }, []);

  const handleDelUser = async (uid) => {
    setIsLoading(true)
    const userDoc = await getUserDocument(uid);
    await updateUserDocument({ ...userDoc, isActive: false });
    await delUserVehicleDocument(userDoc.uid);
    dispatch({ type: "DEL_USER", uid: userDoc.uid });
    setIsLoading(false)
  };

  return (
    <ListContainer>
      <Button className="user-list-button" name={"Users List"} />

      {usersList
        .filter((user) => user.adminId === uid)
        .map((users, index) => {
          return (
            <div key={users.uid} className="usersListWrapper">
              <p>{index + 1}.</p>
              <p className="user-name">{users.name}</p>
              <div className="user-list-icons">
                <FaRegEdit
                  style={{
                    color: "white",
                    background: "#03F346",
                    borderRadius: "0.5rem",
                    padding: "0.3rem",
                    marginRight: "0.3rem",
                    fontSize: "2.2rem",
                  }}
                  onClick={() => {
                    dispatch({ type: "CURRENT_USER", uid: users.uid });
                    history.replace("/settings/user/edit");
                  }}
                />
                <DeleteOutlined
                  style={{
                    color: "white",
                    background: "#F30303",
                    borderRadius: "0.5rem",
                    padding: "0.3rem",
                  }}
                  onClick={() => handleDelUser(users.uid)}
                />
              </div>
            </div>
          );
        })}
    </ListContainer>
  );
};
