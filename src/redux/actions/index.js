import { types } from "./types";

export const submitCode = (payload) => ({
  type: types.SUBMIT_CODE,
  payload,
});

export const submitCsharpCode = (payload) => ({
  type: types.SUBMIT_CSHARP_CODE,
  payload,
});

export const submitTest = (payload) => ({
  type: types.SUBMIT_TEST,
  payload,
});

export const executeCode = (payload) => {
  // Parameters userInput.replaceAll("\n", " ").split(" "),
  // ProgramId "NA",

  if (
    !(
      payload.Code ||
      payload.Language ||
      payload.ProgramName ||
      payload.UserName
    )
  )
    throw new Error("Must pass valid data to execute code");

  return {
    type: types.CODEEXECUTE_UTIL,
    payload: {
      ...payload,
      Parameters: payload.Parameters.replaceAll("\n", " ").split(" "),
      ProgramId: "NA",
    },
  };
};
