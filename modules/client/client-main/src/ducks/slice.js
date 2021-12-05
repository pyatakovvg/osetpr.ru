
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
  filter: [],
  meta: {},
  inProcess: false,
};

const REDUCER_NAME = 'products';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['products'] = [];
      state['inProcess'] = false;
    },

    getProductsRequestAction(state) {
      state['inProcess'] = true;
    },
    getProductsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProductsRequestSuccessAction(state, { payload }) {
      state['products'] = payload['data'];
      state['filter'] = payload['filter'];
      state['meta'] = payload['meta'];
      state['inProcess'] = true;
    },
  },
});

export const {
  resetStateAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,
} = slice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectFilter = (state) => state[REDUCER_NAME]['filter'];
export const selectProducts = (state) => state[REDUCER_NAME]['products'];

export const name = slice['name'];
export const reducer = slice['reducer'];
