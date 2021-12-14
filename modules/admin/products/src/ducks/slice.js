
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  filter: {},
  meta: {},
  inProcess: false,
  itemsInProcess: [],
};

const REDUCER_NAME = 'products';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
    },

    getItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['filter'] = payload['filter'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    removeItemRequestAction(state) {
      state['inProcess'] = true;
    },
    removeItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    removeItemRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    updateItemRequestAction(state, { payload }) {
      state['itemsInProcess'] = [payload, ...state['itemsInProcess']];
      state['inProcess'] = true;
    },
    updateItemRequestFailAction(state, { payload }) {
      state['itemsInProcess'] = state['itemsInProcess'].filter((uuid) => uuid !== payload);
      state['inProcess'] = false;
    },
    updateItemRequestSuccessAction(state, { payload }) {
      state['itemsInProcess'] = state['itemsInProcess'].filter((uuid) => uuid !== payload['uuid']);
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  removeItemRequestAction,
  removeItemRequestFailAction,
  removeItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
} = slice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectFilter = (state) => state[REDUCER_NAME]['filter'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectItemsInProcess = (state) => state[REDUCER_NAME]['itemsInProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
