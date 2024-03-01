import React from "react";
import { View, FlatList } from "react-native";
import useExpenseListCode from "./ExpenseListCode"; // Updated import
import ExpenseItemStructure from "../ExpenseItem/ExpenseItemStructure";
import styles from "./ExpenseListStyle";

const ExpenseListStructure = () => { // Pass currentMonth and currentYear as props
  const filteredExpenses = useExpenseListCode(); // Use the hook
  console.log('filtered expense: ', filteredExpenses);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredExpenses}
        keyExtractor={(expense) => expense.id.toString()}
        renderItem={({ item }) => <ExpenseItemStructure expense={item} /> }
      />
    </View>
  );
};

export default ExpenseListStructure;
