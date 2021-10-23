import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  plans: [],
  inProcess: false,
};

const REDUCER_NAME = 'customer';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
      state['plans'] = [];
      state['inProcess'] = false;
    },

    getItemRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },

    getPlansRequestAction(state) {
      state['inProcess'] = true;
    },
    getPlansRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getPlansRequestSuccessAction(state, { payload }) {
      state['plans'] = payload;
      state['inProcess'] = false;
    },

    updateCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCustomerRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getPlansRequestAction,
  getPlansRequestFailAction,
  getPlansRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,
} = typesSlice['actions'];

export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectPlans = (state) => state[REDUCER_NAME]['plans'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];