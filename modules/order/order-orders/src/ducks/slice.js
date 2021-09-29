
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  statuses: [],
  items: [],
  meta: {},
  inProcess: false,
};

const REDUCER_NAME = 'orders';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['statuses'] = [];
      state['items'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getItemsRequestAction() {},
    getItemsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemsRequestSuccessAction(state, { payload }) {
      state['statuses'] = payload['statuses'];
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  setProcessAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,
} = typesSlice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectStatuses = (state) => state[REDUCER_NAME]['statuses'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
