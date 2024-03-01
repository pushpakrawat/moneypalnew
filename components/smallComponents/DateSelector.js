import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMonthlyDate } from "../../redux/actions/expenseActions";

export default function DateSelector() {
  const mode = useSelector((state) => state.app.themeColors);
  const monthlyDate = useSelector((state) => state.expense.selectedDate);

  const dispatch = useDispatch();

  const handleMonthlyDateSelect = (date) => {
    dispatch(setMonthlyDate(date));
  };

  return (
    <>
      <Text style={{ margin: 5, color: mode.text }}> Date </Text>
      <ScrollView horizontal>
        {Array.from({ length: 28 }, (_, index) => index + 1).map((date) => (
          <TouchableOpacity
            key={date}
            onPress={() => handleMonthlyDateSelect(date)}
            style={{
              backgroundColor: monthlyDate === date ? mode.selected : mode.unselected,
              margin: 5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: monthlyDate === date ? mode.selectedTextColor : mode.unselectedTextColor, // Change text color when selected
              }}
            >
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
