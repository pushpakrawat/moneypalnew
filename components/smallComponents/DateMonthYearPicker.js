import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setExpenseDate } from "../../redux/actions/expenseActions";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateMonthYearPicker() {
  const mode = useSelector((state) => state.app.themeColors);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.expense.expenseEndDate);
  const isRecurring = useSelector((state) => state.expense.isRecurring);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChangeAndDispatch = (date) => {
    dispatch(setExpenseDate(date));
    setShowDatePicker(false);
  };

  const handleRemoveEndDate = () => {
    dispatch(setExpenseDate(""));
    setShowDatePicker(false);
  };

  return (
    <View>
      {!selectedDate && isRecurring && (
        <Text style={{ margin: 5, color: mode.text }}>Set an Ending Date</Text>
      )}

      {!selectedDate && isRecurring !== null && (
        <View
          style={{
            marginVertical: 10,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Button
            color={mode.unselected}
            title="Select Date"
            onPress={() => setShowDatePicker(true)}
            disabled={showDatePicker}
          />
        </View>
      )}

      {selectedDate && (
        <View style={{ margin: 10 }}>
          <Text style={{ margin: 10, color: mode.text }}>
            Selected Date: {selectedDate.toDateString()}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "45%",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Button
                color={mode.unselected}
                title="Edit Date"
                onPress={() => setShowDatePicker(true)}
              />
            </View>
            <View
              style={{
                width: "45%",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Button
                color={mode.unselected}
                title="Remove Date"
                onPress={handleRemoveEndDate}
              />
            </View>
          </View>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleDateChangeAndDispatch(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}
