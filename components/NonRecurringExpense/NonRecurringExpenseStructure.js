import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import styles from './NonRecurringExpenseStyle'; 
import { setIsEnding } from '../../redux/actions/expenseActions';
import DateMonthYearPicker from '../smallComponents/DateMonthYearPicker';

const NonRecurringExpenseStructure = () => {

  const dispatch = useDispatch();

  const isEnding = useSelector(state => state.expense.isEnding);

  const toggleIsEnding = () => {
    dispatch(setIsEnding(!isEnding));
  };

  return (
    <View>
      <DateMonthYearPicker/>
    </View>
  );
};

export default NonRecurringExpenseStructure;
