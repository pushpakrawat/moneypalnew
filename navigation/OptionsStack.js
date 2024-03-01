import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeviceOptions from "../screens/OptionsScreen/OptionTypes/DeviceOptions";
import OptionsScreen from "../screens/OptionsScreen/OptionsScreen";
import AppOptions from "../screens/OptionsScreen/OptionTypes/AppOptions";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const OptionsStack = () => {
  const mode = useSelector((state) => state.app.themeColors);

  const screenOptions = {

    headerStyle: {
      backgroundColor: mode.background,
    },
    headerTitleStyle: {
      color: mode.text, // Set header title color to mode.text
    },
    headerTintColor: mode.text,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OptionsScreen" component={OptionsScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="AppOptions" component={AppOptions}  />
      <Stack.Screen name="DeviceOptions" component={DeviceOptions}  />
    </Stack.Navigator>
  );
};

export default OptionsStack;
