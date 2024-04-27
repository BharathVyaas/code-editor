import { submitUserCodeApi } from "../../services/api";
import { types } from "../actions/types";
import {
  submitCodeRequest,
  submitCodeSuccess,
  submitCodeError,
} from "../slices/codeEditorSlice";
import { takeLatest, put, call } from "redux-saga/effects";

function* submitUserCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCodeApi, action.payload);
    console.log(res);

    yield put(submitCodeSuccess({ data: res.data, status: res.status }));
  } catch (error) {
    console.error(error);
    yield put(submitCodeError(error.status));
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
}
