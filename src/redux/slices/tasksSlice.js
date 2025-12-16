import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: JSON.parse(
    localStorage.getItem('tasks') || [
      {
        id: 1,
        title: 'Выучить react',
        isDone: false,
      },
      {
        id: 2,
        title: 'Сдать 2-й чек-лист',
        isDone: false,
      },
    ]
  ),
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    ADD_NEW_TASK(state, action) {
      state.value.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },
    EDIT_TASK_TITLE(state, action) {
      state.value = state.value.map((task) => {
        if (task.id == action.payload.id) {
          return { ...task, title: action.payload.newTitle };
        }
        return task;
      });
    },
    SWITCH_COMPLETE_STATUS(state, action) {
      state.value = state.value.map((task) => {
        if (task.id == action.payload.id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    },
    DELETE_TASK(state, action) {
      state.value = state.value.filter((task) => {
        return !(task.id == action.payload.id);
      });
    },
    DELETE_COMPLETED_TASKS(state) {
      state.value = state.value.filter((task) => !task.isDone);
    },
    SET_FILTER(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  ADD_NEW_TASK,
  EDIT_TASK_TITLE,
  SWITCH_COMPLETE_STATUS,
  DELETE_TASK,
  DELETE_COMPLETED_TASKS,
  SET_FILTER,
} = taskSlice.actions;
export default taskSlice.reducer;
