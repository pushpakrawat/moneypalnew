import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import TabNavigator from "./TabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/firebaseconfig";
import { setUserId } from "../redux/actions/userActions";
import { setExpenseDocId } from "../redux/actions/expenseActions";

const AppNavigator = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user && user.uid) {
        dispatch(setUserId(user.uid));
        console.log("user id", user.uid);
        dispatch(setExpenseDocId(user.uid));
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  const initialRouteName = loading ? undefined : isLoggedIn ? "TabNavigator" : "AuthStackNavigator";
  console.log("Route:", initialRouteName);

  return (
    <>
      {loading ? null : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuthStackNavigator"
              component={AuthStackNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default AppNavigator;
