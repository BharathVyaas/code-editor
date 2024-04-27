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

export const { updateUserCode } = codeEditorSlice.actions;

export const submitCodeSlice = createPostSlice({ name: "submitCode" });

export const {
  fetchDataRequest: submitCodeRequest,
  fetchDataSuccess: submitCodeSuccess,
  fetchDataError: submitCodeError,
  resetState: submitCodeReset,
} = submitCodeSlice.actions;
