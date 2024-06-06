export const types = {
  // code editor
  SUBMIT_CODE: "submit_code",
  SUBMIT_CSHARP_CODE: "submit_csharp_code",
  SUBMIT_TEST: "submit_test",
  RETRIEVE_DETAILS: "retrieve_details",
  RETRIEVE_TESTCASES: "retrieve_testcases",
  RETRIEVE_DETAILS_TESTCASES: "retrieve_details_testcases",

  // program submmition
  CODEEXECUTE_UTIL: "codeexecute_util",
  CODEEXECUTE_C_UTIL: "codeexecute_c_util",
  P_SUBMIT_CODE: "p_submit_code",

  // UTILS
  // -- CODE EDITOR
  SELECTEDLANGUAGE_UTIL: "selected_language_util",
  SAVE_CURRENT_CODE_UTIL: "save_current_code_util",
};

// UTILS

export const setSelectedLanguage = (payload) => ({
  type: types.SELECTEDLANGUAGE_UTIL,
  payload,
});

export const saveCurrentCode = (payload) => ({
  type: types.SAVE_CURRENT_CODE_UTIL,
  payload,
});
