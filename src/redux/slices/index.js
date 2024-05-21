import { combineReducers } from "@reduxjs/toolkit";
import {
  retrieveDetailsSlice,
  retrieveTestCasesSlice,
  submitCsharpCodeSlice,
  submitTestSlice,
} from "./codeEditorSlice";
import {
  codeEditorSlice,
  monacoSlice,
  submitCodeSlice,
  timerSlice,
} from "./examSlice";

export const reducer = combineReducers({
  // CodeEditor
  codeEditor: codeEditorSlice.reducer,
  submitCode: submitCodeSlice.reducer,
  submitTest: submitTestSlice.reducer,
  retrieveDetails: retrieveDetailsSlice.reducer,
  retrieveTestCases: retrieveTestCasesSlice.reducer,
  submitCsharpCode: submitCsharpCodeSlice.reducer,

  // Exam
  timer: timerSlice.reducer,
  monacoReducer: monacoSlice.reducer,
});
