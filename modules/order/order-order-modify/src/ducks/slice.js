
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  statuses: [],
  inProcess: false,
};

const REDUCER_NAME = 'order-modify';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
      state['statuses'] = [];
      state['inProcess'] = false;
    },

    getItemRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemRequestSuccessAction(state, { payload }) {
      state['statuses'] = payload['statuses'];
      state['item'] = payload['data'];
      state['inProcess'] = false;
    },

    createItemRequestAction(state) {
      state['inProcess'] = true;
    },
    createItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },

    updateItemRequestAction(state) {
      state['inProcess'] = true;
    },
    updateItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
} = typesSlice['actions'];

export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectStatuses = (state) => state[REDUCER_NAME]['statuses'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
