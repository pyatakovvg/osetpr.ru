
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  statuses: [],
  customers: [],
  meta: {},
  inProcess: false,
  itemsInProcess: [],
};

const REDUCER_NAME = 'orders';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['statuses'] = [];
      state['customers'] = [];
      state['meta'] = {};
      state['inProcess'] = false;
      state['itemsInProcess'] = [];
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getItemsRequestAction(state) {
      state['inProcess'] = true;
    },
    getItemsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getItemsRequestSuccessAction(state, { payload }) {
      state['statuses'] = payload['statuses'];
      state['customers'] = payload['customers'];
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    updateStateItemRequestAction(state, { payload }) {
      state['itemsInProcess'] = [...state['itemsInProcess'], payload];
    },
    updateStateItemRequestFailAction(state, { payload }) {
      const index = state['itemsInProcess'].findIndex((uuid) => payload === uuid);
      state['itemsInProcess'] = [
        ...state['itemsInProcess'].slice(0, index),
        ...state['itemsInProcess'].slice(index + 1 )
      ];
    },
    updateStateItemRequestSuccessAction(state, { payload }) {
      const index = state['itemsInProcess'].findIndex((uuid) => payload['uuid'] === uuid);
      state['itemsInProcess'] = [
        ...state['itemsInProcess'].slice(0, index),
        ...state['itemsInProcess'].slice(index + 1 )
      ];
    },

    updateItemAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return {
            ...item,
            ...payload,
          }
        }
        return item;
      });
    }
  },
});

export const {
  resetStateAction,

  setProcessAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  updateStateItemRequestAction,
  updateStateItemRequestFailAction,
  updateStateItemRequestSuccessAction,

  updateItemAction,
} = typesSlice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectStatuses = (state) => state[REDUCER_NAME]['statuses'];
export const selectCustomers = (state) => state[REDUCER_NAME]['customers'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectItemsInProcess = (state) => state[REDUCER_NAME]['itemsInProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
