import { types } from "./types";

export const submitCode = (payload) => ({
  type: types.SUBMIT_CODE,
  payload,
});

export const submitCsharpCode = (payload) => ({
  type: types.SUBMIT_CSHARP_CODE,
  payload,
});
