import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";


const useDynamicStyles = () => {
  const mode = useSelector((state) => state.app.themeColors);

  // Define your styles based on the selected theme mode
  const styles = StyleSheet.create({
    container: {
      backgroundColor: mode.background,
      marginHorizontal: 0,
      marginVertical: 0,
      borderBottomWidth: 2,
      borderColor: mode.borderColor,
      paddingHorizontal: 15,
      paddingVertical: 15,
      width: "100%",
      shadowColor: mode.borderColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 3,
      elevation: 2,
    },
    container2: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 0,
    },
    title: {
      fontSize: 12,
      fontWeight: "bold",
      color: mode.text,
    },
    recurring: {
      fontSize: 14,
      color: mode.text,
    },
    firstBox: {
      // flexDirection: "row",
      // alignItems: "center",
      // justifyContent: "space-between",
    },
    secondBox: {
      flexDirection: "row",
      alignItems: "center",
      verticalAlign: "middle",
      marginHorizontal: 20,
    },
    thirdBox: {
      flexDirection: "row",
      alignItems: "center",
      verticalAlign: "middle",
      marginHorizontal: 10,
    },
    fourthBox: {
      flexDirection: "row",
      marginBottom: 8,
      // alignItems: "center",
      // verticalAlign: 'middle',
      // justifyContent:'center',
      marginHorizontal: 10,
    },
    fifthBox: {
      flexDirection: "row",
      alignItems: "center",
      verticalAlign: "middle",
      marginHorizontal: 10,
    },
    amount: {
      fontSize: 16,
      color: mode.text,
      marginRight: 10,
    },
    dueDate: {
      fontSize: 12,
      color:mode.text,

    },
    deleteButton: {
      alignSelf: "flex-end",
    },
    markPaidButton: {
      alignSelf: "flex-end",
    },
  });

  return styles;
};

export default useDynamicStyles;
