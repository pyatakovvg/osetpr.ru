
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  items: [],
  meta: {},
  inProcess: true,
};

const REDUCER_NAME = 'comments';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
      state['items'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    getItemRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },

    createItemRequestAction(state) {
      state['inProcess'] = true;
    },
    createItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createItemRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    deleteItemRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteItemRequestSuccessAction(state, { payload }) {
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

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  deleteItemRequestAction,
  deleteItemRequestFailAction,
  deleteItemRequestSuccessAction,
} = typesSlice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
