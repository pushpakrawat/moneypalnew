import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RecurringExpenseStyles";
import { useSelector, useDispatch } from "react-redux";
import { selectFrequency, setIsEnding, setIsCustom } from "../../redux/actions/expenseActions";
import FrequencySelector from "../smallComponents/FrequencySelector";
import DateSelector from "../smallComponents/DateSelector";
import MonthSelector from "../smallComponents/MonthSelector";
import DateMonthYearPicker from "../smallComponents/DateMonthYearPicker";
import YearSelector from "../smallComponents/YearSelector";


const RecurringExpenseStructure = () => {

  const dispatch = useDispatch();

  
  return (
    <View>
      <FrequencySelector/>
      <DateSelector/>
      <MonthSelector/>
      <YearSelector/>
      <DateMonthYearPicker/>
    </View>
  );
};

export default RecurringExpenseStructure;
