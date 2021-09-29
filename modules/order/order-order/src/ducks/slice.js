
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  products: [],
  inProcess: false,
  inProductsProcess: false,
};

const REDUCER_NAME = 'order';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
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

    getProductsRequestAction(state) {
      state['inProductsProcess'] = true;
    },
    getProductsRequestFailAction(state) {
      state['inProductsProcess'] = false;
    },
    getProductsRequestSuccessAction(state, { payload }) {
      state['products'] = payload;
      state['inProductsProcess'] = false;
    },

    createItemRequestAction(state) {
      state['inProcess'] = true;
    },
    createItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createItemRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    updateItemRequestAction(state) {
      state['inProcess'] = true;
    },
    updateItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateItemRequestSuccessAction(state) {
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
} = slice['actions'];

export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectProducts = (state) => state[REDUCER_NAME]['products'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectInProductsProcess = (state) => state[REDUCER_NAME]['inProductsProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
