import { all } from "redux-saga/effects";
import { watcherSaga } from "./codeEditorSaga";

export function* adminSaga() {
  yield all([watcherSaga()]);
}
