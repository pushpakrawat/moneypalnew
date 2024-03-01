import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { setSelectedYear } from "../../redux/actions/expenseActions"; // Import your action creator

const YearSelector = () => {
  const mode = useSelector((state) => state.app.themeColors);
  const currentYear = new Date().getFullYear();
  const selectedYear = useSelector((state) => state.expense.selectedYear); // Assuming selectedYear is stored in Redux store
  const dispatch = useDispatch();

  const yearsToShow = [currentYear, currentYear + 1, currentYear + 2];

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    yearContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      margin: 5,
      justifyContent: "center", 
    },
    yearItem: {
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginHorizontal: 5,
      backgroundColor: mode.unselected,
    },
    selectedYearItem: {
      backgroundColor: mode.selected,
    },
    yearText: {
      fontSize: 16,
      color: mode.unselectedTextColor,
    },
    selectedYearText: {
      color: mode.selectedTextColor,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ margin: 5, color: mode.text }}> Next Due Year </Text>
      <View style={styles.yearContainer}>
        {yearsToShow.map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.yearItem,
              year === selectedYear && styles.selectedYearItem,
            ]}
            onPress={() => dispatch(setSelectedYear(year))} // Dispatch action on year selection
          >
            <Text
              style={[
                styles.yearText,
                year === selectedYear && styles.selectedYearText,
              ]}
            >
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default YearSelector;
