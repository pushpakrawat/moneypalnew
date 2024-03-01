import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
// import { dark, light } from "../../assets/Theme/Theme";
import { useTheme } from 'react-native-paper';

const ExpenseSummary = () => {
  const mode = useSelector((state) => state.app.themeColors);

  const expenses = useSelector((state) => state.expense.filteredExpenses);
  const currentMonth = useSelector((state) => state.expense.currentMonth) + 1;
  const currentYear = useSelector((state) => state.expense.currentYear);

  // Calculate total paid and total unpaid amounts
  let totalPaidAmount = 0;
  let totalUnpaidAmount = 0;
  let totalAmount = 0;

  expenses.forEach((expense) => {
    // Check if the expense is paid for the current month and year
    const isPaid = expense.paidMonths.some(
      (item) => item.month === currentMonth && item.year === currentYear
    );

    // If the expense is paid, add its amount to the total paid amount
    if (isPaid) {
      totalPaidAmount += expense.amount;
    } else {
      // If the expense is not paid, add its amount to the total unpaid amount
      totalUnpaidAmount += expense.amount;
    }

    // Add the expense amount to the total amount
    totalAmount += expense.amount;
  });

  // Define styles based on the themeMode
  const summaryStyles = StyleSheet.create({
    summaryContainer: {
      backgroundColor: mode.background,
      padding: 5,
      borderWidth: 2,
      borderColor: mode.borderColor,
      alignItems: "center",
      justifyContent: "center",
    },
    summaryText: {
      fontSize: 12,
      color: mode.text,
    },
  });

  return (
    <View style={summaryStyles.summaryContainer}>
      <Text style={summaryStyles.summaryText}>
        Total: {totalAmount} | Paid: {totalPaidAmount} | Unpaid: {totalUnpaidAmount}
      </Text>
    </View>
  );
};

export default ExpenseSummary;
