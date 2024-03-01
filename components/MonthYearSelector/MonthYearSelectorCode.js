import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMonthName, setCurrentMonth, setCurrentYear } from '../../redux/actions/expenseActions';

export const useMonthYearSelectorLogic = () => {
  const dispatch = useDispatch();

  // Array of month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  
  const currentMonthIndex = useSelector(state => state.expense.currentMonth);
  const currentYear = useSelector(state => state.expense.currentYear);

  const currentMonth = currentMonthIndex; 
  const currentMonthName = monthNames[currentMonthIndex - 1]; // Get the month name from the array

  // console.log('(MD Selector)currentMonthName:', currentMonthName);
  // console.log('(MD Selector)currentMonth:', currentMonth);
  // console.log('(MD Selector)currentYear:', currentYear);

  const handlePrevMonth = () => {
    let newMonth = currentMonthIndex - 1;
    let newYear = currentYear;

    if (newMonth < 1) { // Check if the new month is less than 1
      newMonth = 12; // Set to December
      newYear -= 1;
    }

    dispatch(setCurrentMonthName(monthNames[newMonth - 1])); // Subtract 1 to get the correct index
    dispatch(setCurrentMonth(newMonth)); // Dispatch the index
    dispatch(setCurrentYear(newYear));
  };

  const handleNextMonth = () => {
    let newMonth = currentMonthIndex + 1;
    let newYear = currentYear;

    if (newMonth > 12) { // Check if the new month is greater than 12
      newMonth = 1; // Set to January
      newYear += 1;
    }

    dispatch(setCurrentMonthName(monthNames[newMonth - 1])); // Subtract 1 to get the correct index
    dispatch(setCurrentMonth(newMonth)); // Dispatch the index
    dispatch(setCurrentYear(newYear));
  };

  const handleGoToCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth() + 1; // Start from 1
    const currentMonth = currentMonthIndex; 
    const currentMonthName = monthNames[currentMonthIndex - 1];
    const currentYear = currentDate.getFullYear();

    dispatch(setCurrentMonthName(currentMonthName));
    dispatch(setCurrentMonth(currentMonth)); // Dispatch the index
    dispatch(setCurrentYear(currentYear));
  };

  return {
    currentMonthName,
    currentMonth,
    currentYear,
    handlePrevMonth,
    handleNextMonth,
    handleGoToCurrentMonth,
  };
};
