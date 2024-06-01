import { takeLatest, put, call, select } from "redux-saga/effects";
import {
  retrieveDetailsRequest,
  retrieveDetailsSuccess,
  retrieveDetailsError,
  retrieveTestCasesRequest,
  retrieveTestCasesSuccess,
  retrieveTestCasesError,
  submitTestRequest,
  submitTestSuccess,
  submitTestError,
} from "../slices/codeEditorSlice";
import { types } from "../actions/types";
import {
  submitUserCodeApi,
  submitUserCCodeApi1,
  retrieveDetailsApi,
  retrieveTestCasesApi,
  submitTestApi,
} from "../../services/api";
import {
  setSavingError,
  setIsSavingLoading,
  setMonacoSliceItem,
  setSelectedLanguage,
  submitCodeError,
  submitCodeRequest,
  submitCodeSuccess,
} from "../slices/examSlice";

function* submitUserCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCodeApi, action.payload);

    yield put(
      submitCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitCodeError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* submitTestSaga(action) {
  try {
    yield put(submitTestRequest());

    const res = yield call(submitTestApi, action.payload);

    yield put(
      submitTestSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitTestError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* submitUserCsharpCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCCodeApi1, {
      code: action.payload.Code,
      Parameters: action.payload.Parameters,
    });

    yield put(
      submitCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitCodeError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* retrieveDetailsSaga(action) {
  try {
    yield put(retrieveDetailsRequest());

    const res = yield call(retrieveDetailsApi, action.payload);

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      retrieveDetailsError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

function* retrieveTestCasesSaga(action) {
  try {
    yield put(retrieveTestCasesRequest());

    const res = yield call(retrieveTestCasesApi, action.payload);

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      retrieveTestCasesError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

function* retieveDetailsTestCasesSaga(action) {
  try {
    let persistedData;

    if (localStorage.getItem("persist:exam-state:0.0.1"))
      persistedData = JSON.parse(
        JSON.parse(localStorage.getItem("persist:exam-state:0.0.1"))
          ?.retrieveTestCases
      );

    yield put(retrieveDetailsRequest());
    yield put(retrieveTestCasesRequest());

    let res;

    if (persistedData && persistedData.data) {
      res = {
        data: { dbresult: persistedData.data },
        status: persistedData.status,
        statusMessage: persistedData.statusMessage,
      };
    } else {
      res = yield call(retrieveTestCasesApi, action.payload);
    }

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );

    if (localStorage.getItem("persist:exam-state:0.0.1"))
      persistedData = JSON.parse(
        JSON.parse(localStorage.getItem("persist:exam-state:0.0.1"))
          ?.retrieveDetails
      );

    if (persistedData && persistedData.data) {
      res = {
        data: { dbresult: [persistedData.data] },
        status: persistedData.status,
        statusMessage: persistedData.statusMessage,
      };
    } else {
      res = yield call(retrieveDetailsApi, action.payload);
    }

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      retrieveTestCasesError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

// UTILS
export function* selectedLanguageUtilSaga(action) {
  try {
    yield put(setIsSavingLoading(true));
    const { userCode, selectedLanguage } = yield select(
      (state) => state.codeEditor
    );

    yield put(
      setMonacoSliceItem({
        key: action.payload.key,
        code: userCode,
        language: selectedLanguage,
      })
    );

    yield put(setSelectedLanguage(action.payload.language));
    yield put(setIsSavingLoading(false));
  } catch (err) {
    console.error("Error in selectedLanguageUtilSaga", err);
    yield put(setSavingError({ flag: true, errorMsg: err.message }));
  }
}

export function* saveCurrentCodeUtilSaga(action) {
  try {
    yield put(setIsSavingLoading(true));

    yield put(
      setMonacoSliceItem({
        key: action.payload.key,
        code: action.payload.code,
        language: action.payload.language,
      })
    );

    yield put(setIsSavingLoading(false));
  } catch (err) {
    console.error("Error Saving current code.", err);
    yield put(setSavingError({ flag: true, errorMsg: err.message }));
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
  yield takeLatest(types.SUBMIT_CSHARP_CODE, submitUserCsharpCodeSaga);
  yield takeLatest(types.RETRIEVE_DETAILS, retrieveDetailsSaga);
  yield takeLatest(types.RETRIEVE_TESTCASES, retrieveTestCasesSaga);
  yield takeLatest(types.SUBMIT_TEST, submitTestSaga);
  yield takeLatest(
    types.RETRIEVE_DETAILS_TESTCASES,
    retieveDetailsTestCasesSaga
  );
  yield takeLatest(types.SELECTEDLANGUAGE_UTIL, selectedLanguageUtilSaga);
  yield takeLatest(types.SAVE_CURRENT_CODE_UTIL, saveCurrentCodeUtilSaga);
}
