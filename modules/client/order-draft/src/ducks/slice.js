
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  payments: [],
};

const REDUCER_NAME = 'order-draft';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['payments'] = [];
    },

    getPaymentsRequestAction() {},
    getPaymentsRequestFailAction(state) {},
    getPaymentsRequestSuccessAction(state, { payload }) {
      state['payments'] = payload;
    },
  },
});

export const {
  resetStateAction,

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,
} = slice['actions'];

export const selectPayments = (state) => state[REDUCER_NAME]['payments'];

export const name = slice['name'];
export const reducer = slice['reducer'];
