import { View } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";

export default function HSgraph() {
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );

  const mode = useSelector((state) => state.app.themeColors);
  // Define default data in case filteredExpenses is empty
  const defaultData = {
    labels: ["0", "1", "2", "3", "4"], // Example default labels
    datasets: [
      {
        data: [0, 0, 0, 0, 0], // Example default data
      },
    ],
  };

  if (!filteredExpenses || filteredExpenses.length === 0) {
    // Use the default data if filteredExpenses is empty
    return (
      <View>
        <LineChart
          data={defaultData}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="₹"
          yAxisInterval={1}
          chartConfig={{
            // Your chart configuration for default data
            backgroundColor: "#e26a00",
            backgroundGradientFrom: mode.primary,
            backgroundGradientTo: mode.primary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 0,
              marginTop: 0,
              marginBottom: 0,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              // stroke: "#FFDC32",
            },
          }}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 0,
          }}
        />
      </View>
    );
  }

  const dateAmountMap = {};
  const allDates = [];

  // Aggregate amounts based on dates
  filteredExpenses.forEach((expense) => {
    if (expense.expenseEndDate) {
      const endDate = new Date(expense.expenseEndDate);
      const dayOfMonth = endDate.getDate();
      dateAmountMap[dayOfMonth] = (dateAmountMap[dayOfMonth] || 0) + expense.amount;
      allDates.push(dayOfMonth);
    } else if (expense.selectedDate) {
      dateAmountMap[expense.selectedDate] = (dateAmountMap[expense.selectedDate] || 0) + expense.amount;
      allDates.push(expense.selectedDate);
    }
  });

  const uniqueDates = [...new Set(allDates)];

  uniqueDates.sort((a, b) => a - b);

  const aggregatedData = uniqueDates.map((dayOfMonth) => dateAmountMap[dayOfMonth]);

  return (
    <View>
      <LineChart
        data={{
          labels: uniqueDates.map((dayOfMonth) => dayOfMonth.toString()),
          datasets: [
            {
              data: aggregatedData,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="₹"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: mode.colors.selected,
          backgroundGradientFrom: mode.primary,
          backgroundGradientTo: mode.primary,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 0,
            marginTop: 0,
            marginBottom: 0,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: mode.selected,
          },
        }}
        bezier
        style={{
          marginVertical: 0,
          borderRadius: 0,
        }}
      />
    </View>
  );
}
