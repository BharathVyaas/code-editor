import {
  retrieveDetailsApi,
  retrieveTestCasesApi,
  submitTestApi,
  submitUserCCodeApi1,
  submitUserCodeApi,
} from "../../services/api";
import { types } from "../actions/types";
import {
  submitCodeRequest,
  submitCodeSuccess,
  submitCodeError,
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
import { takeLatest, put, call } from "redux-saga/effects";

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
    yield put(retrieveDetailsRequest());
    yield put(retrieveTestCasesRequest());

    let res = yield call(retrieveTestCasesApi, action.payload);

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );

    res = yield call(retrieveDetailsApi, action.payload);

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
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
}
