import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const inputTextSlice = createSlice({
  name: 'inputText',
  initialState,
  reducers: {
    CHANGE(state, action) {
      state.value = action.payload;
    },
    CLEAR(state) {
      state.value = '';
    },
  },
});

export const { CHANGE, CLEAR } = inputTextSlice.actions;
export default inputTextSlice.reducer;
