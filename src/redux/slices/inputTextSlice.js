import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const inputTextSlice = createSlice({
  name: 'inputText',
  initialState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
    clear(state) {
      state.value = '';
    },
  },
});

export const { change, clear } = inputTextSlice.actions;
export default inputTextSlice.reducer;
