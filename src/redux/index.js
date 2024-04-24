import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/index";
import createSagaMiddleware from "redux-saga";
import { adminSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(sagaMiddleware),
});

// startup saga
sagaMiddleware.run(adminSaga);

export default store;
