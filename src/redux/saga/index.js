import { all } from "redux-saga/effects";
import { watcherSaga as codeEditorWatcher } from "./codeEditorSaga";
import { watcherSaga as programSubmmitoinWatcher } from "./programSubmmitionSaga";

export function* adminSaga() {
  yield all([codeEditorWatcher(), programSubmmitoinWatcher()]);
}
