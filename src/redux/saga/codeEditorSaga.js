import {
  retrieveDetailsApi,
  retrieveTestCasesApi,
  submitUserCodeApi,
  submitUserCsharpCodeApi1,
  submitUserCsharpCodeApi2,
} from "../../services/api";
import { types } from "../actions/types";
import {
  submitCodeRequest,
  submitCodeSuccess,
  submitCodeError,
  retrieveDetailsRequest,
  retrieveDetailsSuccess,
  rretrieveDetailsError,
  retrieveTestCasesRequest,
  retrieveTestCasesSuccess,
  rretrieveTestCasesError,
  submitCsharpCodeRequest,
  submitCsharpCodeSuccess,
  submitCsharpCodeError,
} from "../slices/codeEditorSlice";
import { takeLatest, put, call, delay } from "redux-saga/effects";

function* submitUserCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCodeApi, action.payload);
    console.log(res);

    yield put(
      submitCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(submitCodeError(error.status));
  }
}

function* submitUserCsharpCodeSaga(action) {
  try {
    yield put(submitCsharpCodeRequest());

    let res = yield call(submitUserCsharpCodeApi1, action.payload);
    console.log(res);

    yield delay(30000);

    res = yield call(submitUserCsharpCodeApi2, action.payload, res);
    console.log(res);

    yield put(
      submitCsharpCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(submitCsharpCodeError(error.status));
  }
}

function* retrieveDetailsSaga(action) {
  try {
    yield put(retrieveDetailsRequest());

    const res = yield call(retrieveDetailsApi, action.payload);
    console.log(res);

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(rretrieveDetailsError(error.status));
  }
}

function* retrieveTestCasesSaga(action) {
  try {
    yield put(retrieveTestCasesRequest());

    const res = yield call(retrieveTestCasesApi, action.payload);
    console.log(res);

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(rretrieveTestCasesError(error.status));
  }
}

function* retieveDetailsTestCasesSaga(action) {
  try {
    yield put(retrieveDetailsRequest());
    yield put(retrieveTestCasesRequest());

    let res = yield call(retrieveTestCasesApi, action.payload);
    console.log(res);

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );

    res = yield call(retrieveDetailsApi, action.payload);
    console.log(res);

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(rretrieveTestCasesError(error.status));
    yield put(rretrieveTestCasesError(error.status));
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
  yield takeLatest(types.SUBMIT_CSHARP_CODE, submitUserCsharpCodeSaga);
  yield takeLatest(types.RETRIEVE_DETAILS, retrieveDetailsSaga);
  yield takeLatest(types.RETRIEVE_TESTCASES, retrieveTestCasesSaga);
  yield takeLatest(
    types.RETRIEVE_DETAILS_TESTCASES,
    retieveDetailsTestCasesSaga
  );
}
