import {
  SET_DATA_LOADED,
  SET_YEARLY_MONTH,
  SET_MONTHLY_DATE,
  SET_CURRENT_MONTH_NAME,
  SET_CURRENT_MONTH,
  SET_CURRENT_YEAR,
  ADD_EXPENSE,
  SET_TITLE,
  SET_AMOUNT,
  SET_IS_RECURRING,
  SET_EXPENSE_DATE,
  SET_FILTERED_EXPENSES,
  CLEAR_FIELDS,
  SELECT_FREQUENCY,
  SET_SELECTED_YEAR,
  ADD_PAID_MONTH,
  REMOVE_PAID_MONTH,
  REMOVE_EXPENSE,
  GET_EXPENSES,
  SET_EXPENSEDOC_ID,
} from "../actionTypes"; 

// Other action creators
export const setDataLoaded = (isDataLoaded) => {  return {    type: SET_DATA_LOADED,    payload: isDataLoaded,  };};
export const setYearlyMonth = (monthIndex) => ({ type: SET_YEARLY_MONTH, payload: monthIndex });
export const setCurrentMonthName = (monthName) => ({ type: SET_CURRENT_MONTH_NAME, payload: monthName });
export const setCurrentMonth = (month) => ({ type: SET_CURRENT_MONTH, payload: month });
export const setCurrentYear = (year) => ({ type: SET_CURRENT_YEAR, payload: year });
export const setTitle = (title) => ({ type: SET_TITLE, payload: title });
export const setAmount = (amount) => ({ type: SET_AMOUNT, payload: amount });
export const setIsRecurring = (isRecurring) => ({ type: SET_IS_RECURRING, payload: isRecurring });
export const setExpenseDate = (date) => ({ type: SET_EXPENSE_DATE, payload: date });
export const setMonthlyDate = (date) => ({ type: SET_MONTHLY_DATE, payload: date });
export const setSelectedYear = (year) => ({ type: SET_SELECTED_YEAR, payload: year });
export const selectFrequency = (frequency) => ({ type: SELECT_FREQUENCY, payload: frequency });
export const addExpense = (newExpense) => ({ type: ADD_EXPENSE, payload: newExpense });
export const clearFields = () => ({ type: CLEAR_FIELDS });
export const addPaidMonth = ({ expenseId, month, year }) => ({ type: ADD_PAID_MONTH, payload: { expenseId, month, year } });
export const removePaidMonth = ({ expenseId, month, year }) => ({ type: REMOVE_PAID_MONTH, payload: { expenseId, month, year } });
export const setFilteredExpenses = (filteredExpenses) => ({ type: SET_FILTERED_EXPENSES, payload: filteredExpenses });
export const removeExpense = (expenseId) => ({ type: REMOVE_EXPENSE, payload: { expenseId } });
export const getExpenses = (expenses) => {  return {    type: GET_EXPENSES,    payload: expenses,  };};
export const setExpenseDocId = (expenseDocId) => {
  return {
    type: SET_EXPENSEDOC_ID,
    payload: expenseDocId,
  };
};