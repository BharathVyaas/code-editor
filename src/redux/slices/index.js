import { combineReducers } from "@reduxjs/toolkit";
import {
  codeEditorSlice,
  retrieveDetailsSlice,
  retrieveTestCasesSlice,
  submitCodeSlice,
  submitCsharpCodeSlice,
} from "./codeEditorSlice";
import undoable from "redux-undo";

export const reducer = combineReducers({
  codeEditor: undoable(codeEditorSlice.reducer, { limit: 3 }),
  submitCode: submitCodeSlice.reducer,
  retrieveDetails: retrieveDetailsSlice.reducer,
  retrieveTestCases: retrieveTestCasesSlice.reducer,
  submitCsharpCode: submitCsharpCodeSlice.reducer,
});
