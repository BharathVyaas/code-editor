import { combineReducers } from "@reduxjs/toolkit";
import {
  codeEditorSlice,
  retrieveDetailsSlice,
  retrieveTestCasesSlice,
  submitCodeSlice,
  submitCsharpCodeSlice,
  submitTestSlice,
} from "./codeEditorSlice";
import { timerSlice } from "./examSlice";

export const reducer = combineReducers({
  // CodeEditor
  codeEditor: codeEditorSlice.reducer,
  submitCode: submitCodeSlice.reducer,
  submitTest: submitTestSlice.reducer,
  retrieveDetails: retrieveDetailsSlice.reducer,
  retrieveTestCases: retrieveTestCasesSlice.reducer,
  submitCsharpCode: submitCsharpCodeSlice.reducer,

  // Timer
  timer: timerSlice.reducer,
});
