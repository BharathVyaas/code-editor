import { combineReducers } from "@reduxjs/toolkit";
import { submitCodeSlice } from "./codeEditorSlice";

export const reducer = combineReducers({
  submitCode: submitCodeSlice.reducer,
});
