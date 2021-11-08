
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  order: null,
  inProcess: false,
};

const REDUCER_NAME = 'order';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
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
      state['order'] = payload;
      state['inProcess'] = false;
    },

    updateOrderRequestSuccessAction(state, { payload }) {
      state['order'] = {
        ...state['order'],
        ...payload,
      };
    },
  },
});

export const {
  resetStateAction,

  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,

  updateOrderRequestSuccessAction,
} = slice['actions'];

export const selectOrder = (state) => state[REDUCER_NAME]['order'];

export const name = slice['name'];
export const reducer = slice['reducer'];
