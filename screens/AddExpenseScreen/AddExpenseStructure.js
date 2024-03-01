import React from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, Button, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setIsRecurring } from "../../redux/actions/expenseActions";
import NonRecurringExpenseStructure from "../../components/NonRecurringExpense/NonRecurringExpenseStructure";
import RecurringExpenseStructure from "../../components/RecurringExpense/RecurringExpenseStructure";
import useCustomStyles from "././AddExpenseStyle";
import { useAddExpenseLogic } from "./AddExpenseCode";


const AddExpenseStructure = () => {
  const mode = useSelector((state) => state.app.themeColors);
  const dispatch = useDispatch();
  const isRecurring = useSelector((state) => state.expense.isRecurring);
  const {
    handleAddExpense,
    handleTitleChange,
    handleAmountChange,
    title,
    amount,
  } = useAddExpenseLogic();
  const styles = useCustomStyles();

  return (
    <View style={styles.container}>
      <ScrollView >
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={handleTitleChange}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={handleAmountChange}
          value={amount}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              color={isRecurring === true ? mode.selected : mode.unselected}
              style={styles.button}
              title="Recurring"
              onPress={() => dispatch(setIsRecurring(true))}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              color={isRecurring === false ? mode.selected : mode.unselected}
              style={styles.button}
              title="One Time"
              onPress={() => dispatch(setIsRecurring(false))}
            />
          </View>
        </View>

        {isRecurring ? <RecurringExpenseStructure /> : <NonRecurringExpenseStructure />}

        <View style={styles.submitButtonWrapper}>
          <Button
            color={mode.unselected}
            title="Submit"
            onPress={() => handleAddExpense()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddExpenseStructure;
