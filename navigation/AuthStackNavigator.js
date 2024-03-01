import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginStructure from "../screens/LoginScreen/LoginStructure";

const Stack = createStackNavigator();

const AuthStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginStructure}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthStackNavigator;
