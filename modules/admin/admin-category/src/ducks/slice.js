
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  inProcess: false,
};

const REDUCER_NAME = 'category';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['inProcess'] = false;
    },

    getItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemsRequestActionFail(state) {
      state['inProcess'] = false;
    },
    getItemsRequestActionSuccess(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    updateItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    updateItemsRequestActionFail(state) {
      state['inProcess'] = false;
    },
    updateItemsRequestActionSuccess(state, { payload }){
      state['items'] = payload;
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getItemsRequestAction,
  getItemsRequestActionFail,
  getItemsRequestActionSuccess,

  updateItemsRequestAction,
  updateItemsRequestActionFail,
  updateItemsRequestActionSuccess,
} = typesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
