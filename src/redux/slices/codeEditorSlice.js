import { createPostSlice } from "../util/createSliceUtil";

export const submitCodeSlice = createPostSlice({ name: "submitCode" });

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataError,
  resetState,
} = submitCodeSlice.actions;
