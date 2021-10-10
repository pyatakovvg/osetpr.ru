
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  customer: null,
  inProcess: false,
};

const REDUCER_NAME = 'settings';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['customer'] = null;
      state['inProcess'] = false;
    },

    getCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    getCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCustomerRequestSuccessAction(state, { payload }) {
      state['customer'] = payload;
      state['inProcess'] = false;
    },

    updateCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCustomerRequestSuccessAction(state, { payload }) {
      state['customer'] = payload;
      state['inProcess'] = false;
    },

    changePasswordRequestAction(state) {
      state['inProcess'] = true;
    },
    changePasswordRequestFailAction(state) {
      state['inProcess'] = false;
    },
    changePasswordRequestSuccessAction(state) {
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getCustomerRequestAction,
  getCustomerRequestFailAction,
  getCustomerRequestSuccessAction,

  changePasswordRequestAction,
  changePasswordRequestFailAction,
  changePasswordRequestSuccessAction,
} = slice['actions'];

export const selectCustomer = (state) => state[REDUCER_NAME]['customer'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
