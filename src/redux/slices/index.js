import { combineReducers } from "@reduxjs/toolkit";
import { codeEditorSlice, submitCodeSlice } from "./codeEditorSlice";
import undoable from "redux-undo";

export const reducer = combineReducers({
  codeEditor: undoable(codeEditorSlice.reducer, { limit: 3 }),
  submitCode: submitCodeSlice.reducer,
});
