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
    addNewTask(state, action) {
      state.value.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },
    editTaskTitle(state, action) {
      state.value = state.value.map((task) => {
        if (task.id == action.payload.id) {
          return { ...task, title: action.payload.newTitle };
        }
        return task;
      });
    },
    switchCompleteStatus(state, action) {
      state.value = state.value.map((task) => {
        if (task.id == action.payload.id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    },
    deleteTask(state, action) {
      state.value = state.value.filter((task) => {
        return task.id !== action.payload.id;
      });
    },
    deleteCompletedTasks(state) {
      state.value = state.value.filter((task) => !task.isDone);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  addNewTask,
  editTaskTitle,
  switchCompleteStatus,
  deleteTask,
  deleteCompletedTasks,
  setFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
