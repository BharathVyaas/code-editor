import { call, put, takeLatest } from "redux-saga/effects";

import {
  executeCodeError,
  executeCodeRequest,
  executeCodeSuccess,
} from "../slices/programSubmmition/executeCodeSlice";
import { executeCodeApi } from "../../services/api";
import { types } from "../actions/types";

function* executeCodeSaga(action) {
  try {
    yield put(executeCodeRequest());

    const res = yield call(executeCodeApi, action.payload);

    yield put(
      executeCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      executeCodeError({ status: error.status, statusMessage: error.message })
    );
  }
}

export function* watcherSaga() {
  yield takeLatest(types.CODEEXECUTE_UTIL, executeCodeSaga);
}
