import { legacy_createStore, combineReducers } from 'redux';
import inputTextReducer from './reducers/inputTextReducer';
import tasksReducer from './reducers/tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  inputText: inputTextReducer,
});

const store = window.__REDUX_DEVTOOLS_EXTENSION__
  ? legacy_createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__())
  : legacy_createStore(rootReducer);

export default store;
