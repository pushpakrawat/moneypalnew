import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setYearlyMonth } from '../../redux/actions/expenseActions';

export default function MonthSelector() {
  const mode = useSelector((state) => state.app.themeColors);
  const dispatch = useDispatch();

  const yearlyMonth = useSelector((state) => state.expense.selectedMonth) - 1;
  const isEnding = useSelector((state) => state.expense.isEnding);

  const handleYearlyMonthSelect = (monthIndex) => {
    dispatch(setYearlyMonth(monthIndex + 1));
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[monthIndex];
  };

  return (
    <>
      <Text style={{ margin: 5, color: mode.text }}> Next Due Month </Text>
      <ScrollView horizontal>
        {Array.from({ length: 12 }, (_, index) => index).map((monthIndex) => (
          <TouchableOpacity
            key={monthIndex}
            onPress={() => handleYearlyMonthSelect(monthIndex)}
            style={{
              backgroundColor: yearlyMonth === monthIndex ? mode.selected : mode.unselected,
              margin: 5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: yearlyMonth === monthIndex ? mode.selectedTextColor : mode.unselectedTextColor, // Change text color when selected
              }}
            >
              {getMonthName(monthIndex)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
