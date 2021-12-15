
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  meta: {},
  inProcess: false,
};

const REDUCER_NAME = 'customers';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
    },

    getItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,
} = typesSlice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
