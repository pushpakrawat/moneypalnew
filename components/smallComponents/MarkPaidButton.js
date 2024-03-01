import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/FontAwesome";
import {
  addPaidMonth,
  removePaidMonth,
} from "../../redux/actions/expenseActions";

const MarkPaidButton = ({ expense }) => {
  const dispatch = useDispatch();
  const currentMonth = useSelector((state) => state.expense.currentMonth) + 1;
  const currentYear = useSelector((state) => state.expense.currentYear);
  const mode = useSelector((state) => state.app.themeColors);

  const [isPaid, setIsPaid] = useState('');

  const handlePress = () => {
    const isExpensePaid = expense.paidMonths.some(
      (item) => item.month === currentMonth && item.year === currentYear
    );

    if (isExpensePaid) {
      dispatch(
        removePaidMonth({
          expenseId: expense.id,
          month: currentMonth,
          year: currentYear,
        })
      );
    } else {
      dispatch(
        addPaidMonth({
          expenseId: expense.id,
          month: currentMonth,
          year: currentYear,
        })
      );
    }

    setIsPaid(isExpensePaid); // Update the state with the correct value
    return isExpensePaid; // Return the value
  };

  const dynamicStyles = StyleSheet.create({
    button: {
      backgroundColor: mode.background,
      borderRadius: 25,
    },
    buttonHighlighted: {
      backgroundColor: mode.background,
    },
    icon: {},
  });

  let localIsPaid = isPaid; // Create a local variable
  localIsPaid = expense.paidMonths.some(
    (item) => item.month === currentMonth && item.year === currentYear
  );

  return (
    <TouchableOpacity
      onPress={() => {
        localIsPaid = handlePress(); // Update the local variable
        setIsPaid(localIsPaid); // Update the state with the local variable value
      }}
      style={[dynamicStyles.button, localIsPaid && dynamicStyles.buttonHighlighted]}
    >
      <Feather
        name={localIsPaid ? "check-circle" : "check-circle"}
        size={35}
        color={localIsPaid ? mode.selected : mode.unselected}
      />
    </TouchableOpacity>
  );
};

export default MarkPaidButton;
