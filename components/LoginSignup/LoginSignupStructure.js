import React from "react";
import { Formik } from "formik";
import styles from "./LoginSignupStyle";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginSchema } from "./validation/validationSchemas";
import { handleLogin, toggleMode } from "./LoginSignupLogic";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";

const LoginSignupStructure = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = React.useState(true);

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
