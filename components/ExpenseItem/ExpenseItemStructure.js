import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useExpenseItemLogic, confirmDelete } from "./ExpenseItemCode";
import MarkPaidButton from "../smallComponents/MarkPaidButton";
import Icons from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import useDynamicStyles from "./ExpenseItemStyle"; // Import your useDynamicStyles

const ExpenseItemStructure = ({ expense }) => {
  const mode = useSelector((state) => state.app.themeColors);
  const { formattedDate, formattedDueDate, confirmDelete } =
    useExpenseItemLogic(expense);
  const { id, title, amount, isRecurring } = expense;

  // Use your dynamic styles
  const dynamicStyles = useDynamicStyles();

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.firstBox}>
          <Text style={dynamicStyles.title}>{title}</Text>
          <Text style={dynamicStyles.amount}>₹{amount}</Text>
        </View>
        <View style={dynamicStyles.container2}>
          <View style={dynamicStyles.secondBox}>
            <Icons
              name="cycle"
              size={18}
              color={isRecurring ? mode.selected : mode.unselected}
            />
          </View>
          <View style={dynamicStyles.thirdBox}>
            <Text style={dynamicStyles.dueDate}>
              <Icon3 name="date" size={15} color="red" /> {formattedDueDate}
            </Text>
          </View>
          <View style={dynamicStyles.fourthBox}>
            <TouchableOpacity
              style={dynamicStyles.deleteButton}
              onPress={() => confirmDelete(expense.id)}
            >
              <AntDesign name="closecircle" size={20} />
            </TouchableOpacity>
          </View>
          <View style={dynamicStyles.fifthBox}>
            <MarkPaidButton expense={expense} style={dynamicStyles.markPaidButton} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseItemStructure;
