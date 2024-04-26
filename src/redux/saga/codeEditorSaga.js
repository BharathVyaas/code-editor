import { submitUserCodeApi } from "../../services/api";
import { types } from "../actions/types";
import {
  fetchDataError,
  fetchDataRequest,
  fetchDataSuccess,
} from "../slices/codeEditorSlice";
import { takeLatest, put, call } from "redux-saga/effects";

function* submitUserCodeSaga(action) {
  try {
    yield put(fetchDataRequest());

    const res = yield call(submitUserCodeApi, action.payload);
    console.log(res);

    yield put(fetchDataSuccess({ data: res.data, status: res.status }));
  } catch (error) {
    console.error(error);
    yield put(fetchDataError(error.status));
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
}
