import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function OptionsScreen() {
  const navigation = useNavigation();
  const mode = useSelector((state) => state.app.themeColors);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mode.background, // Set the background color to mode.background
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      
    },
    card: {
      margin: 16,
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: mode.background,
      borderRadius: 20,
      elevation: 10, // Add an elevation to create a shadow
      shadowColor: mode.shadowColor, // Shadow color with 50% opacity
      shadowOffset: mode.shadowOffset, // Shadow offset (horizontal and vertical)
      shadowRadius: mode.shadowRadius, // Shadow radius
      shadowOpacity: mode.shadowOpacity, // Shadow opacity (1 means fully opaque)
    },
    imageStyle: {
      borderRadius: 10,
    },
    row1: {
      flexDirection: "row",
    },
    row2: {
      flexDirection: "row",
    },
    heading: {
      fontSize: 20,
    },
    imageTitle: {
      color: mode.text,
      fontSize: 18,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <TouchableOpacity onPress={() => console.log("User Options pressed")}>
          <ImageBackground
            source={require("../../assets/optionsIcons/user.png")}
            style={styles.card}
            imageStyle={styles.imageStyle}
          ></ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Expense Options pressed")}
        >
          <ImageBackground
            source={require("../../assets/optionsIcons/expense.png")}
            style={styles.card}
            imageStyle={styles.imageStyle}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.row2}>
        <TouchableOpacity onPress={() => navigation.navigate("AppOptions")}>
          <ImageBackground
            source={require("../../assets/optionsIcons/app.png")}
            style={styles.card}
            imageStyle={styles.imageStyle}
          ></ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("DeviceOptions")}>
          <ImageBackground
            source={require("../../assets/optionsIcons/device.png")}
            style={styles.card}
            imageStyle={styles.imageStyle}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}
