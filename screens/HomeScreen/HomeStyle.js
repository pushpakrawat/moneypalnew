import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const useDynamicStyles = () => {
  
  const mode = useSelector((state) => state.app.themeColors);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: mode.background, // Set the background color based on the theme mode
      flex: 1, // Ensure the component takes up the entire screen
    },
  });

  return styles;
};

export default useDynamicStyles;
