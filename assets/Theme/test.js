import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ColorBoxes = () => {
  const theme = useSelector((state) => state.app.themeColors);
  console.log("theme from color boxes:", theme);
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: theme.primary }]}>
        {/* You can customize the content of the box */}
      </View>
      <View style={[styles.box, { backgroundColor: theme.background }]}>
        {/* You can customize the content of the box */}
      </View>
      <View style={[styles.box, { backgroundColor: theme.focussedBackground }]}>
        {/* You can customize the content of the box */}
      </View>
      <View style={[styles.box, { backgroundColor: theme.textFieldBackgound }]}>
        {/* You can customize the content of the box */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 90,
  },
});

export default ColorBoxes;
