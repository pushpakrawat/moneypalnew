import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { Icons } from "../constants/Icons";
import * as Animatable from "react-native-animatable";
import HomeCode from "../screens/HomeScreen/HomeCode";
import AddExpenseStructure from "../screens/AddExpenseScreen/AddExpenseStructure";
import OptionsStack from "./OptionsStack";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeCode,
  },
  {
    route: "Add",
    label: "Add New",
    type: Icons.Feather,
    icon: "plus-square",
    component: AddExpenseStructure,
  },
  {
    route: "Options",
    label: "Options",
    type: Icons.Feather,
    icon: "grid",
    component: OptionsStack,
  },
];

const Tab = createBottomTabNavigator();

const getStyles = (mode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: mode.background,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 30,
    },
  });
};

export default function TabNavigator() {
  const mode = useSelector((state) => state.app.themeColors);

  const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      } else {
        viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      }
    }, [focused]);

    const styles = getStyles(mode);

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
        <View>
          <Animatable.View
            ref={viewRef}
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: mode.focussedBackground, borderRadius: 30 },
            ]}
          />
          <View style={[styles.btn, { backgroundColor: focused ? null : mode.background }]}>
            <Icon
              type={item.type}
              name={item.icon}
              color={focused ? mode.focussedText : mode.text}
            />
            <Animatable.View ref={textViewRef}>
              {focused && (
                <Text style={{ color: mode.focussedText, paddingHorizontal: 16 }}>
                  {item.label}
                </Text>
              )}
            </Animatable.View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          flex: 0,
          height: 50,
          width: "100%",
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
