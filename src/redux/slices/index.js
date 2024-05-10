import { combineReducers } from "@reduxjs/toolkit";
import {
  codeEditorSlice,
  retrieveDetailsSlice,
  retrieveTestCasesSlice,
  submitCodeSlice,
  submitCsharpCodeSlice,
  submitTestSlice,
} from "./codeEditorSlice";
import undoable from "redux-undo";

export const reducer = combineReducers({
  codeEditor: undoable(codeEditorSlice.reducer, { limit: 3 }),
  submitCode: submitCodeSlice.reducer,
  submitTest: submitTestSlice.reducer,
  retrieveDetails: retrieveDetailsSlice.reducer,
  retrieveTestCases: retrieveTestCasesSlice.reducer,
  submitCsharpCode: submitCsharpCodeSlice.reducer,
});
