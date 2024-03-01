import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {  setIsCustom } from '../../redux/actions/expenseActions';

import DateMonthYearPicker from '../smallComponents/DateMonthYearPicker';



const CustomOptionsStructure = () => {



  return (
    <View>
      <DateMonthYearPicker/>  
    </View>
  );
};

export default CustomOptionsStructure;
