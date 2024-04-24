import { types } from "./types";

export const submitCode = (payload) => ({
  type: types.SUBMIT_CODE,
  payload,
});
