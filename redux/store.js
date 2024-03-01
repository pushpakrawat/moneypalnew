import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'; // Use the root reducer


const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;
