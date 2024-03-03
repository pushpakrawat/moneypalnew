import React from "react";
import styles from "./LoginStyle";
import { View } from "react-native";
import { GoogleSignIn } from "../../components/GoogleSignin/googleSignin";
import ForgotPasswordModal from "../PasswordReset/ForgotPasswordModal";
import LoginSignupStructure from "../../components/LoginSignup/LoginSignupStructure";

const LoginStructure = () => {

  return (
    <View style={styles.container}>
      <LoginSignupStructure />
      <ForgotPasswordModal />
      <GoogleSignIn />
    </View>
  );
};

export default LoginStructure;
