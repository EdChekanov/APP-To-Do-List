import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (state, thunkAPI) => {
    try {
      const { data } = await api.get('/todos');
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (newTitle, thunkAPI) => {
    try {
      const { data } = await api.post('/todos', { title: newTitle });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTaskTitle = createAsyncThunk(
  'tasks/editTaskTitle',
  async ({ id, newTitle }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/todos/${id}`, { title: newTitle });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const switchCompleteStatus = createAsyncThunk(
  'tasks/switchCompleteStatus',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.patch(`/todos/${id}/isCompleted`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/todos/${id}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  'tasks/deleteCompletedTasks',
  async (state, thunkAPI) => {
    const { value: tasks } = thunkAPI.getState().tasks;
    const completedTasks = tasks.filter((task) => task.isCompleted);

    try {
      await Promise.all(
        completedTasks.map((task) => api.delete(`/todos/${task.id}`))
      );
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
