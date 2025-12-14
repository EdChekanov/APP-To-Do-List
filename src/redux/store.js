import { legacy_createStore, combineReducers } from 'redux';
import inputTextReducer from './reducers/inputTextReducer';
import tasksReducer from './reducers/tasksReducer';

const store = legacy_createStore(
  combineReducers(
    {
      tasks: tasksReducer,
      inputText: inputTextReducer,
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
