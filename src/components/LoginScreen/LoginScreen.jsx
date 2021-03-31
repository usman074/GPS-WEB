import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "../common";
import { LoginWrapper, LoginContainer } from "./style";
import { useHistory } from "react-router-dom";
import { auth, generateUserDocument } from "../../firebase";
import { useAuthContext } from "../../providers/AuthProvider";


export const LoginScreen = (props) => {
  const { isLogin, setIsLogin } = props;

  const history = useHistory();
  const { state, dispatch } = useAuthContext();


  useEffect(() => {
    if (!isLogin && state.user && state.isLogin) {
      setIsLogin(true);
      localStorage.setItem("uid", state.user.uid);
      history.replace("/dashboard");
    }
  }, [state]);



  const validateLoginForm = () => {
    return Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    });
  };

  const handleLoginForm = async (values) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      const userDoc = await generateUserDocument(user, { isAdmin: true });

      if (userDoc.isAdmin) {
        dispatch({ type: "SAVE_USER", payload: userDoc });
      }
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "DEL_USER", payload: null });
    }
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
            <h1 className="page-heading">
              Welcome To <br /> TFM GPS Tracking
            </h1>
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
