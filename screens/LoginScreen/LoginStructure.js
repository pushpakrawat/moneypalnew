import React, { useEffect } from "react";
import styles from "./LoginStyle";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GoogleSignIn } from "../../components/GoogleSignin/googleSignin";
import ForgotPasswordModal from "../PasswordReset/ForgotPasswordModal";
import { setUserId } from "../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { FIREBASE_AUTH } from "../../firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import LoginSignupStructure from "../../components/LoginSignup/LoginSignupStructure"
import { setExpenseDocId } from "../../redux/actions/expenseActions";

const LoginStructure = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        dispatch(setUserId(user.uid));
        dispatch(setExpenseDocId(user.uid));
        navigation.navigate("TabNavigator");
      }
    });

    // Remember to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <LoginSignupStructure />
      <ForgotPasswordModal />
      <GoogleSignIn />
    </View>
  );
};

export default LoginStructure;
