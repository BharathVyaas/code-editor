import { createSlice } from "@reduxjs/toolkit";
import { createPostSlice } from "../util/createSliceUtil";

export const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState: {
    userCode: ``,
  },
  reducers: {
    updateUserCode: (state, action) => {
      return { ...state, userCode: action.payload };
    },
  },
});

export const retrieveDetailsSlice = createPostSlice({
  name: "retrieveDetails",
});
export const retrieveTestCasesSlice = createPostSlice({
  name: "retrieveTestCases",
});
export const submitCodeSlice = createPostSlice({ name: "submitCode" });
export const submitCsharpCodeSlice = createPostSlice({
  name: "submitCsharpCode",
});

// actions
export const { updateUserCode } = codeEditorSlice.actions;

export const {
  fetchDataRequest: retrieveDetailsRequest,
  fetchDataSuccess: retrieveDetailsSuccess,
  fetchDataError: retrieveDetailsError,
  resetState: retrieveDetailsReset,
} = retrieveDetailsSlice.actions;

export const {
  fetchDataRequest: retrieveTestCasesRequest,
  fetchDataSuccess: retrieveTestCasesSuccess,
  fetchDataError: retrieveTestCasesError,
  resetState: retrieveTestCasesReset,
} = retrieveTestCasesSlice.actions;

export const {
  fetchDataRequest: submitCodeRequest,
  fetchDataSuccess: submitCodeSuccess,
  fetchDataError: submitCodeError,
  resetState: submitCodeReset,
} = submitCodeSlice.actions;

export const {
  fetchDataRequest: submitCsharpCodeRequest,
  fetchDataSuccess: submitCsharpCodeSuccess,
  fetchDataError: submitCsharpCodeError,
  resetState: submitCsharpCodeReset,
} = submitCsharpCodeSlice.actions;
