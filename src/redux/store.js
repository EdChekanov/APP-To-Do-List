import { configureStore, combineReducers } from '@reduxjs/toolkit';
import inputTextReducer from './slices/inputTextSlice';
import tasksReducer from './slices/tasksSlice';

const store = configureStore({
  reducer: combineReducers({
    tasks: tasksReducer,
    inputText: inputTextReducer,
  }),
});

export default store;
