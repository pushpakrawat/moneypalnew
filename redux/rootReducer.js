import { combineReducers } from 'redux';
import expenseReducer from './reducers/expenseReducer'; 
import userReducer from './reducers/userReducer'
import { appReducer } from './reducers/appReducer';

const rootReducer = combineReducers({
  expense: expenseReducer,
  user: userReducer,
  app: appReducer,
});

export default rootReducer;
