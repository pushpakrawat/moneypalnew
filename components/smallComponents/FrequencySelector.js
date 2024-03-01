import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectFrequency } from "../../redux/actions/expenseActions"; // Import your Redux action

const FrequencySelector = () => {
  const mode = useSelector((state) => state.app.themeColors);
  const dispatch = useDispatch();
  const selectedFrequencyIndex =
    useSelector((state) => state.expense.selectedFrequency) - 1; // Replace with your Redux state selector
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingVertical: 10,
    },
    frequencyButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      backgroundColor: mode.unselected,
    },
    selectedFrequencyButton: {
      backgroundColor: mode.selected,
      borderColor: "grey",
    },
    buttonText: {
      color: mode.unselectedTextColor,
      fontSize: 16,
    },
    selectedButtonText: {
      color: mode.unselectedTextColor, // Change the text color to white when selected
    },
  });
  const handleFrequencySelection = (index) => {
    dispatch(selectFrequency(index + 1)); // Dispatch your Redux action to update the selected frequency index
  };

  const renderFrequencyButtons = () => {
    const frequencies = [
      "1 month",
      "2 months",
      "3 months",
      "4 months",
      "5 months",
      "6 months",
      "7 months",
      "8 months",
      "9 months",
      "10 months",
      "11 months",
      "Yearly",
    ];

    return frequencies.map((frequency, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.frequencyButton,
          selectedFrequencyIndex === index && styles.selectedFrequencyButton,
        ]}
        onPress={() => handleFrequencySelection(index)}
      >
        <Text
          style={[
            styles.buttonText,
            selectedFrequencyIndex === index && styles.unselectedTextColor,
          ]}
        >
          {frequency}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <Text style={{ margin: 5, color: mode.text }}> Occurng every </Text>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {renderFrequencyButtons()}
      </ScrollView>
    </>
  );
};

export default FrequencySelector;
