import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateMonthYearPicker from '../smallComponents/DateMonthYearPicker';
import DateSelector from '../smallComponents/DateSelector';
import { setIsEnding } from '../../redux/actions/expenseActions';

const MonthlyOptionStructure = () => {
  const dispatch = useDispatch();
  const isEnding = useSelector(state => state.expense.isEnding);

  const toggleIsEnding = () => {
    dispatch(setIsEnding(!isEnding));
  };

  return (
    <View>
      <DateSelector/>   
      <Text>Set an end date:</Text>
      <Switch value={isEnding} onValueChange={toggleIsEnding} />
      <DateMonthYearPicker/>      
    </View>
  );
};

export default MonthlyOptionStructure;
