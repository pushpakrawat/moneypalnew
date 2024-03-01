import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFilteredExpenses } from "../../redux/actions/expenseActions";

const useExpenseListCode = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const currentMonth = useSelector((state) => state.expense.currentMonth);
  const currentYear = useSelector((state) => state.expense.currentYear);

  function formatDateAsNumber(dateString) {
    if (!dateString) {
      return 0; // Return 0 for null or empty dates
    }
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    return day; 
  }
  
  // Modify the expenses array to include formatted dates as numbers
  for (const expense of expenses) {
    const formattedDateNumber = formatDateAsNumber(expense.expenseEndDate);
    expense.formattedDateNumber = formattedDateNumber === 0 ? expense.selectedDate : formattedDateNumber;
  }
  
  // Sort expenses based on the formatted date numbers
  expenses.sort((a, b) => a.formattedDateNumber - b.formattedDateNumber);
  

  
  

  const filteredExpenses = expenses.filter((expense) => {
    const {
      expenseEndDate,
      selectedFrequency,
      isRecurring,
      selectedMonth,
      selectedYear,
    } = expense;
    // console.log('EL - Selected Month', selectedMonth);
    // console.log('EL - Selected Year', selectedYear);

    const endMonth = expenseEndDate ? expenseEndDate.getMonth() + 1 : Infinity;
    // console.log('EL - End Month', endMonth)
    const endYear = expenseEndDate ? expenseEndDate.getFullYear() : Infinity;
    // console.log('EL - End Year', endYear)

    if (!isRecurring) {
      if (endMonth === currentMonth && endYear === currentYear) {
        return true;
      }
    } else {
      if (
        (selectedYear < currentYear && currentYear < endYear) ||
        (selectedYear === currentYear && selectedMonth <= currentMonth) ||
        (endYear === currentYear && endMonth >= currentMonth)
      ) {
        const a = (currentYear - selectedYear) * 12;
        const b = currentMonth - selectedMonth;
        const x = (a + b) % selectedFrequency;

        return x === 0;
      }
    }

    return false;
  });


  

  useEffect(() => {
    dispatch(setFilteredExpenses(filteredExpenses));
  }, [dispatch, filteredExpenses]);
  return filteredExpenses;
};

export default useExpenseListCode;
