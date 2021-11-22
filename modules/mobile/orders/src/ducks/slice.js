
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  orders: [],
  inProcess: false,
};

const REDUCER_NAME = 'orders';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['orders'] = [];
      state['inProcess'] = false;
    },

    getOrdersRequestAction(state) {
      state['inProcess'] = true;
    },
    getOrdersRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getOrdersRequestSuccessAction(state, { payload }) {
      state['orders'] = payload;
      state['inProcess'] = false;
    },

    updateOrderRequestSuccessAction(state, { payload }) {
      state['orders'] = state['orders'].map((order) => {
        if (order['externalId'] === payload['externalId']) {
          return {
            ...order,
            ...payload,
          };
        }
        return order;
      });
    },
  },
});

export const {
  resetStateAction,

  getOrdersRequestAction,
  getOrdersRequestFailAction,
  getOrdersRequestSuccessAction,

  updateOrderRequestSuccessAction,
} = slice['actions'];

export const selectOrders = (state) => state[REDUCER_NAME]['orders'];

export const name = slice['name'];
export const reducer = slice['reducer'];
