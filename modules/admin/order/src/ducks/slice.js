
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  products: [],
  customers: [],
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

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getItemRequestAction(state) {},
    getItemRequestFailAction(state) {},
    getItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
    },

    getCustomersRequestAction(state) {},
    getCustomersRequestFailAction(state) {},
    getCustomersRequestSuccessAction(state, { payload }) {
      state['customers'] = payload;
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

  setProcessAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getCustomersRequestAction,
  getCustomersRequestFailAction,
  getCustomersRequestSuccessAction,

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
export const selectCustomers = (state) => state[REDUCER_NAME]['customers'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectInProductsProcess = (state) => state[REDUCER_NAME]['inProductsProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
