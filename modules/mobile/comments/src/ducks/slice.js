
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: [],
  meta: {},
  inProcess: false,
};

const REDUCER_NAME = 'comments';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['data'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
    },

    getCommentsRequestAction(state) {
      state['inProcess'] = true;
    },
    getCommentsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCommentsRequestSuccessAction(state, { payload }) {
      state['data'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,
} = slice['actions'];

export const selectData = (state) => state[REDUCER_NAME]['data'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
