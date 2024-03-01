import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import DateMonthYearPicker from '../smallComponents/DateMonthYearPicker';
import DateSelector from '../smallComponents/DateSelector';
import MonthSelector from '../smallComponents/MonthSelector';
import { setIsEnding } from '../../redux/actions/expenseActions';
import { useDispatch, useSelector } from 'react-redux';

const YearlyOptionsStructure = () => {
  const dispatch = useDispatch();
  const isEnding = useSelector(state => state.expense.isEnding);

  const toggleIsEnding = () => {
    dispatch(setIsEnding(!isEnding));
  };

  return (
    <View>
      <Text>Select Date:</Text>
      <DateSelector/>
      <Text>Select Month:</Text>
      <MonthSelector/>
      <Text>Is Ending:</Text>
      <Switch value={isEnding} onValueChange={toggleIsEnding} />
      <DateMonthYearPicker/>
    </View>
  );
};

export default YearlyOptionsStructure;
