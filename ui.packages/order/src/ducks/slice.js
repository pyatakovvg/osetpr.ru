
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'widget-order';

const initialState = {
  step: 0,
  order: null,
  inProcess: false,
  productsInProcess: [],
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    nextStepAction(state, { payload }) {
      state['step'] = payload;
    },

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

    updateOrderRequestAction(state, { payload }) {
      state['productsInProcess'] = [...state['productsInProcess'], payload];
      state['inProcess'] = true;
    },
    updateOrderRequestFailAction(state, { payload }) {
      state['productsInProcess'] = state['productsInProcess'].filter((productUuid) => productUuid !== payload['uuid']);
      state['inProcess'] = false;
    },
    updateOrderRequestSuccessAction(state, { payload }) {
      state['productsInProcess'] = state['productsInProcess'].filter((productUuid) => productUuid !== payload['uuid']);
      state['inProcess'] = false;
      state['order'] = payload;
    },
  },
});

export const {
  nextStepAction,

  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,

  updateOrderRequestAction,
  updateOrderRequestFailAction,
  updateOrderRequestSuccessAction,
} = slice['actions'];

export const selectStep = (state) => state[REDUCER_NAME]['step'];
export const selectOrder = (state) => state[REDUCER_NAME]['order'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectModesInProcess = (state) => state[REDUCER_NAME]['modesInProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];