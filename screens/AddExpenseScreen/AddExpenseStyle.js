import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

const useCustomStyles = () => {
  
  const mode = useSelector((state) => state.app.themeColors);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 16,
      backgroundColor: mode.background, // Set the background color to mode.background
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: mode.text, // Set the text color to mode.text
    },
    input: {
      height: 40,
      borderColor: mode.borderColor,
      backgroundColor: mode.textFieldBackgound,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
      paddingLeft: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      alignSelf: "center",
    },
    buttonWrapper: {
      flex: 1,
      marginHorizontal: 4,
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: mode.primary, // Set the background color for the button
    },
    submitButtonWrapper: {
      width: "100%",
      alignSelf: "center",
      borderRadius: 8,
      marginVertical: 10,
      overflow: "hidden",
      backgroundColor: mode.primary, // Set the background color for the button
    },
    button: {
      backgroundColor: mode.primary, // Set the background color for the button
    },
    buttonText: {
      color: mode.text, // Set the text color to mode.text
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return styles;
};

export default useCustomStyles;
