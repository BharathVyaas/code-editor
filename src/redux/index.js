import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/index";
import createSagaMiddleware from "redux-saga";
import { adminSaga } from "./saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "exam-state:0.0.1",
  storage,
  whitelist: ["timer", "monacoReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(sagaMiddleware),
});

sagaMiddleware.run(adminSaga);

const persistor = persistStore(store);

export { store, persistor };
