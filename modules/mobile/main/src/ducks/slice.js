
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
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
      state['products'] = payload;
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

export const selectProducts = (state) => state[REDUCER_NAME]['products'];

export const name = slice['name'];
export const reducer = slice['reducer'];
