
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  product: null,
  inProcess: false,
};

const REDUCER_NAME = 'product';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['product'] = null;
      state['inProcess'] = false;
    },

    getProductRequestAction(state) {
      state['inProcess'] = true;
    },
    getProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProductRequestSuccessAction(state, { payload }) {
      state['product'] = payload;
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} = slice['actions'];

export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
