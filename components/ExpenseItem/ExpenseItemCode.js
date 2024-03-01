import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { removeExpense } from "../../redux/actions/expenseActions";
export const useExpenseItemLogic = (expense) => {
  const dispatch = useDispatch();

  const {
    date,
    title,
    amount,
    isRecurring,
    selectedFrequency,
    selectedDate,
    selectedMonth,
    selectedYear,
    expenseEndDate,
  } = expense;

  const dateObject = new Date(date);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth();
  const year = dateObject.getUTCFullYear() % 100;

  const formattedDate = `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year.toString().padStart(2, "0")}`;

  // Get current month and year from Redux store
  const currentMonth = useSelector((state) => state.expense.currentMonth) ;
  const currentYear = useSelector((state) => state.expense.currentYear);

  let formattedDueDate;

  if (!isRecurring) {
    const endDate = expense.expenseEndDate;
    const endDay = endDate.getUTCDate();
    formattedDueDate = `${endDay.toString().padStart(2, "0")}/${currentMonth
      .toString()
      .padStart(2, "0")}/${currentYear.toString().padStart(2, "0")}`;
  } else {
    formattedDueDate = `${selectedDate
      .toString()
      .padStart(2, "0")}/${currentMonth
      .toString()
      .padStart(2, "0")}/${currentYear.toString().padStart(2, "0")}`;
  }

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(removeExpense(id));
          },
        },
      ]
    );
  };

  return {
    title,
    amount,
    isRecurring,
    formattedDate,
    formattedDueDate,
    confirmDelete,
  };
};
