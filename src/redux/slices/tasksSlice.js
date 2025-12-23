import { createSlice } from '@reduxjs/toolkit';
import {
  getTasks,
  addNewTask,
  editTaskTitle,
  switchCompleteStatus,
  deleteTask,
  deleteCompletedTasks,
} from '../api/tasksApi';

const initialState = {
  value: JSON.parse(localStorage.getItem('tasks')) || [],
  filter: 'all',
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.value.unshift(action.payload);
      })
      .addCase(editTaskTitle.fulfilled, (state, action) => {
        state.value = state.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, title: action.payload.title };
          }
          return task;
        });
      })
      .addCase(switchCompleteStatus.fulfilled, (state, action) => {
        state.value = state.value.map((task) => {
          if (task.id == action.payload.at(0).id) {
            return { ...task, isCompleted: !task.isCompleted };
          }
          return task;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.value = state.value.filter((task) => {
          return task.id !== action.payload.id;
        });
      })
      .addCase(deleteCompletedTasks.fulfilled, (state) => {
        state.value = state.value.filter((task) => !task.isCompleted);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
