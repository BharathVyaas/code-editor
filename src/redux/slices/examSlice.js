import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timer: 0,
    shouldCount: true,
  },
  reducers: {
    setTimer(state, action) {
      state.timer = action.payload;
    },
    setShouldCount(state, action) {
      state.shouldCount = action.payload;
    },
    resetTimer(state) {
      state.timer = 0;
    },
  },
});

export const { setTimer, resetTimer, setShouldCount } = timerSlice.actions;
