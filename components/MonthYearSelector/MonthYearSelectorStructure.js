import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useMonthYearSelectorLogic } from './MonthYearSelectorCode';
import useDynamicStyles from './MonthYearSelectorStyle';

const MonthYearSelectorStructure = () => {
  const mode = useSelector((state) => state.app.themeColors);
  const {
    currentMonthName,
    currentYear,
    handlePrevMonth,
    handleNextMonth,
    handleGoToCurrentMonth,
  } = useMonthYearSelectorLogic();

  const dynamicStyles = useDynamicStyles(); // Get dynamic styles

  return (
    <View style={dynamicStyles.container}>
      <TouchableOpacity onPress={handlePrevMonth} style={dynamicStyles.button}>
        <AntDesign name="left" size={20} color={mode.focussedBorder} />
      </TouchableOpacity>

      <View style={dynamicStyles.dateContainer}>
        <Text style={dynamicStyles.dateText}>{currentMonthName} {currentYear}</Text>
      </View>

      <TouchableOpacity onPress={handleNextMonth} style={dynamicStyles.button}>
        <AntDesign name="right" size={20} color={mode.focussedBorder} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToCurrentMonth} style={dynamicStyles.goToCurrentButton}>
        <AntDesign name="arrowleft" size={20} color={mode.focussedBorder} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthYearSelectorStructure;
