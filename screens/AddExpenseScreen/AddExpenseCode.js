import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setAmount, setIsRecurring, addExpense, setExpenseDate, setMonthlyDate, selectFrequency, setSelectedYear, setYearlyMonth } from '../../redux/actions/expenseActions';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation


export const useAddExpenseLogic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const { title, amount, isRecurring, expenseEndDate, selectedFrequency,selectedDate, selectedMonth, selectedYear, paidMonths, refId } = useSelector(state => state.expense);



  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomNumber = Math.floor(Math.random() * 36 ** 6).toString(36); // Generate a random number between 0 and 36^6 - 1
    return `${timestamp}-${randomNumber}`;
  };
  

  const handleTitleChange = text => {
    // console.log('handleTitleChange:', text);
    dispatch(setTitle(text));
  };

  const handleAmountChange = text => {
    // console.log('handleAmountChange:', text);
    dispatch(setAmount(text));
  };


  const handleDateChange = date => {
    // console.log('handleDateChange:', date);
    dispatch(setExpenseDate(date)); // Dispatch the selected date to Redux
  };

  const handleAddExpense = () => {
    if (title && amount ) { // Make sure a date is selected
      const newExpense = {
        date: new Date(),
        refId,
        title,
        amount: parseFloat(amount),
        isRecurring,
        selectedFrequency,
        selectedDate,
        selectedMonth,
        selectedYear,
        expenseEndDate,
        paidMonths,
      };
      // console.log('handleAddExpense - New Expense:', newExpense);
      dispatch(addExpense(newExpense));

      // Clear the fields
      dispatch(setTitle(''));
      dispatch(setAmount(''));
      dispatch(setIsRecurring(null));
      dispatch(setMonthlyDate(""));   
      dispatch(setExpenseDate(""));   
      dispatch(selectFrequency(""));   
      dispatch(setMonthlyDate(""));   
      dispatch(setYearlyMonth(""));   
      dispatch(setSelectedYear(""));   

      // Navigate back
      navigation.goBack();
    }
  };

  return {
    handleAddExpense,
    handleTitleChange,
    handleAmountChange,
    handleDateChange,
    title,
    amount,
    isRecurring,
    expenseEndDate,
  };
};
