import { createSlice } from "@reduxjs/toolkit";

const baseState = {
  isLoading: false,
  isPending: false,
  data: null,
  isError: false,
  status: null,
  state: "stale",
};

export const createGetSlice = ({ name, state, reducers }) =>
  createSlice({
    name,
    initialState: {
      ...baseState,
      ...state,
    },
    reducers: { ...reducers },
  });

export const createPostSlice = ({ name, state, reducers }) =>
  createSlice({
    name,
    initialState: {
      ...baseState,
      ...state,
    },
    reducers: {
      fetchDataRequest(state, action) {
        state.isLoading = true;
        state.state = "pending";
        state.status = null;
        state.data = null;
        state.isError = false;
        state.isPending = true;
      },
      fetchDataSuccess(state, action) {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.state = "response";
        state.isError = false;
        state.isPending = false;
      },
      fetchDataError(state, action) {
        state.isError = true;
        state.data = null;
        state.status = "reject";
        state.isLoading = false;
        state.status = action.payload.status;
      },
      resetState(state) {
        state.isLoading = baseState.isLoading;
        state.isPending = baseState.isPending;
        state.data = baseState.data;
        state.isError = baseState.isError;
        state.status = baseState.status;
        state.state = baseState.state;
      },
      ...reducers,
    },
  });
