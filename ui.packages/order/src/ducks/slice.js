
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'order-widget';

const initialState = {
  products: [],
  order: null,
  inProcess: false,
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    getOrderRequestAction(state) {
      state['inProcess'] = true;
    },
    getOrderRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getOrderRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['order'] = payload;
    },

    updateOrderRequestAction(state) {
      state['inProcess'] = true;
    },
    updateOrderRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateOrderRequestSuccessAction(state, { payload }) {
      console.log(payload)
      state['inProcess'] = false;
      state['order'] = payload;
    },
  },
});

export const {
  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,

  updateOrderRequestAction,
  updateOrderRequestFailAction,
  updateOrderRequestSuccessAction,
} = slice['actions'];

export const selectOrder = (state) => state[REDUCER_NAME]['order'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];