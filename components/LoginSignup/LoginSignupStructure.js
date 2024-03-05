import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import styles from "./LoginSignupStyle";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GoogleAuthProvider, signInWithCredential, getAuth } from "@react-native-firebase/auth"; // Import Firebase auth functions
import { loginSchema } from "./validation/validationSchemas";
import { handleLogin, toggleMode } from "./LoginSignupLogic";
import { setUserId, setLoggedStatus } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSignupStructure = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = getAuth(); // Get Firebase Auth instance
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check if authentication credentials exist in AsyncStorage
        const authCredentials = await AsyncStorage.getItem('authCredentials');
        console.log("Retrieved auth credentials from AsyncStorage:", authCredentials); // Add this line

        if (authCredentials) {
          // If credentials exist, parse them
          const { idToken, accessToken } = JSON.parse(authCredentials);
          console.log("Parsed auth credentials:", { idToken, accessToken });

          if (idToken && accessToken) { // Check if both tokens are present
            // Authenticate the user with Firebase using the saved credentials
            const credential = GoogleAuthProvider.credential(idToken, accessToken);
            console.log("Credential for signing in:", credential);

            const userCredential = await signInWithCredential(auth, credential); // Pass `auth` instance
            const user = userCredential.user;

            // Dispatch actions to update user state
            dispatch(setLoggedStatus(true));
            dispatch(setUserId(user.uid));
            dispatch(setExpenseDocId(user.uid));

            // Navigate to the desired screen
            navigation.navigate("TabNavigator");
          } else {
            console.error("Stored auth credentials are incomplete");
            // Handle error here
          }
        }
      } catch (error) {
        console.error("Error signing in with saved credentials:", error);
        // Handle error here
      }
    };

    // Check authentication state when the component mounts
    checkAuthState();
  }, [dispatch, navigation, auth]); // Include `auth` in the dependency array

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values, isLoginMode, dispatch, navigation)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <View style={styles.errorContainer}>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          <View style={styles.errorContainer}>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLoginMode ? "Login" : "Signup"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleMode(isLoginMode, setIsLoginMode)}>
            <Text style={styles.link}>
              {isLoginMode
                ? "Not registered yet? Signup"
                : "Already registered? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginSignupStructure;
