import { submitUserCodeApi } from "../../services/api";
import { types } from "../actions/types";
import {
  fetchDataError,
  fetchDataRequest,
  fetchDataSuccess,
} from "../slices/codeEditorSlice";
import { takeLatest } from "redux-saga/effects";

function* submitUserCodeSaga(action) {
  try {
    yield fetchDataRequest();

    const res = submitUserCodeApi(action.payload);
    yield fetchDataSuccess({ data: res.data, status: res.status });
  } catch (error) {
    console.error(error);
    fetchDataError(error.status);
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
}
