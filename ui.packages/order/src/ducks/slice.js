
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'widget-order';

const initialState = {
  step: 0,
  order: null,
  inProcess: false,
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    nextStepAction(state, { payload }) {
      state['step'] = payload;
    },

    resetStateAction(state) {
      state['step'] = 0;
      state['order'] = null;
      state['inProcess'] = false;
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

    updateOrderRequestAction(state) {
      state['inProcess'] = true;
    },
    updateOrderRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateOrderRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['order'] = payload;
    },
  },
});

export const {
  nextStepAction,

  resetStateAction,

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

export const name = slice['name'];
export const reducer = slice['reducer'];