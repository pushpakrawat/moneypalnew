import {
  addExpenseToFirestore,
  updateExpenseInFirestore,
  deleteExpenseFromFirestore,
} from "../../firebase/firebaseUtils";
import {
  SET_DATA_LOADED,
  SET_CURRENT_MONTH_NAME,
  SET_CURRENT_MONTH,
  SET_CURRENT_YEAR,
  ADD_EXPENSE,
  SET_TITLE,
  SET_AMOUNT,
  SET_IS_RECURRING,
  SET_YEARLY_MONTH,
  SET_SELECTED_YEAR,
  SET_EXPENSE_DATE,
  SET_MONTHLY_DATE,
  SELECT_FREQUENCY,
  ADD_PAID_MONTH,
  REMOVE_PAID_MONTH,
  SET_FILTERED_EXPENSES,
  REMOVE_EXPENSE,
  GET_EXPENSES,
  SET_EXPENSEDOC_ID,
} from "../actionTypes";

const currentDate = new Date();
const initialMonth = currentDate.getMonth() + 1;
const initialYear = currentDate.getFullYear();

const initialState = {
  refId: "",
  expenseDocId: null,
  isDataLoaded: false,
  currentMonthName: "",
  currentMonth: initialMonth,
  currentYear: initialYear,
  title: "",
  amount: "",
  isRecurring: null,
  selectedFrequency: "",
  selectedDate: "",
  selectedMonth: "",
  selectedYear: "",
  expenseEndDate: "",
  filteredExpenses: [],
  expenses: [],
  paidMonths: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_LOADED:
      return { ...state, isDataLoaded: action.payload };

    case SET_CURRENT_MONTH_NAME:
      return { ...state, currentMonthName: action.payload };

    case SET_CURRENT_MONTH:
      return { ...state, currentMonth: action.payload };

    case SET_CURRENT_YEAR:
      return { ...state, currentYear: action.payload };

    case SET_TITLE:
      return { ...state, title: action.payload };

    case SET_AMOUNT:
      return { ...state, amount: action.payload };

    case SET_IS_RECURRING:
      return { ...state, isRecurring: action.payload };

    case SELECT_FREQUENCY:
      return { ...state, selectedFrequency: action.payload };

    case SET_MONTHLY_DATE:
      return { ...state, selectedDate: action.payload };

    case SET_YEARLY_MONTH:
      return { ...state, selectedMonth: action.payload };

    case SET_SELECTED_YEAR:
      return { ...state, selectedYear: action.payload };

    case SET_EXPENSE_DATE:
      return { ...state, expenseEndDate: action.payload };

    case ADD_EXPENSE:
      handleFirestoreOperation(addExpenseToFirestore, action.payload, state.expenseDocId);
      return { ...state, isDataLoaded: false };

    case SET_EXPENSEDOC_ID:
      return { ...state, expenseDocId: action.payload };

    case ADD_PAID_MONTH:
      const updatedExpensesAfterAdd = state.expenses.map((expense) =>
        expense.id === action.payload.expenseId
          ? {
              ...expense,
              paidMonths: [...new Set([...expense.paidMonths, action.payload])],
            }
          : expense
      );

      // Call the updateExpenseInFirestore function to update the paid months in the database
      updateExpenseInFirestore(action.payload.expenseId, {
        paidMonths: updatedExpensesAfterAdd.find(
          (expense) => expense.id === action.payload.expenseId
        ).paidMonths, // Get the updated paidMonths array
      }, state.expenseDocId);

      return {
        ...state,
        expenses: updatedExpensesAfterAdd,
      };

    case REMOVE_PAID_MONTH:
      const updatedExpensesAfterRemove = state.expenses.map((expense) =>
        expense.id === action.payload.expenseId
          ? {
              ...expense,
              paidMonths: expense.paidMonths.filter(
                (item) =>
                  item.month !== action.payload.month ||
                  item.year !== action.payload.year
              ),
            }
          : expense
      );

      // Call the updateExpenseInFirestore function to update the paid months in the database
      updateExpenseInFirestore(action.payload.expenseId, {
        paidMonths: updatedExpensesAfterRemove.find(
          (expense) => expense.id === action.payload.expenseId
        ).paidMonths, // Get the updated paidMonths array
      }, state.expenseDocId);

      return {
        ...state,
        expenses: updatedExpensesAfterRemove,
      };

    case SET_FILTERED_EXPENSES:
      return { ...state, filteredExpenses: action.payload };

    case REMOVE_EXPENSE:
      console.log("Deleting Expense");
      handleFirestoreOperation(
        deleteExpenseFromFirestore,
        action.payload.expenseId, 
        state.expenseDocId
      );
      return { ...state, isDataLoaded: false };

    case GET_EXPENSES:
      console.log("Reducer - expenses retrieved: ", action.payload);
      return { ...state, expenses: action.payload };

    default:
      return state;
  }
};

// Helper function to handle async Firestore operations
const handleFirestoreOperation = async (operation, payload, expenseDocId) => {
  try {
    await operation(payload, expenseDocId);
  } catch (error) {
    console.error("Error performing Firestore operation: ", error);
  }
};

export default expenseReducer;
