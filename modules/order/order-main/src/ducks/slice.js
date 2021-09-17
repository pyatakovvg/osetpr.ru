
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  items: [],
  units: [],
  error: null,
  inProcess: false,
  inFormProcess: false,
};

const REDUCER_NAME = 'attributes';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
      state['items'] = [];
      state['units'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    resetItemAction(state) {
      state['item'] = null;
    },

    getUnitsRequestAction() {},
    getUnitsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getUnitsRequestSuccessAction(state, { payload }) {
      state['units'] = payload;
      state['inProcess'] = false;
    },

    createUnitRequestSuccessAction(state, { payload }) {
      if ( ! state['units'].some((unit) => unit['id'] === payload['id'])) {
        state['units'] = [payload, ...state['units']];
      }
    },
    updateUnitRequestSuccessAction(state, { payload }) {
      state['units'] = state['units'].map((unit) => {
        if (unit['id'] === payload['id']) {
          return {
            ...unit,
            ...payload,
          };
        }
        return unit;
      });
      state['items'] = state['items'].map((item) => {
        if (item['unit']) {
          if (item['unit']['id'] === payload['id']) {
            return {
              ...item,
              unit: {
                id: payload['id'],
                value: payload['value'],
              }
            }
          }
        }
        return item;
      });
    },
    deleteUnitRequestSuccessAction(state, { payload }) {
      state['units'] = state['units'].filter((unit) => !~ payload.indexOf(unit['id']));
    },

    getItemRequestAction(state) {
      state['inFormProcess'] = true;
    },
    getItemRequestFailAction(state) {
      state['inFormProcess'] = false;
    },
    getItemRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inFormProcess'] = false;
    },

    getItemsRequestAction(state) {},
    getItemsRequestFailAction(state) {},
    getItemsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createItemRequestAction(state) {
      state['inProcess'] = true;
    },
    createItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createItemRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((item) => item['id'] === payload['id'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateItemRequestAction(state) {
      state['inProcess'] = true;
    },
    updateItemRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateItemRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        if (item['id'] === payload['id']) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteItemRequestAction() {},
    deleteItemRequestFailAction() {},
    deleteItemRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  resetItemAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  createUnitRequestSuccessAction,
  updateUnitRequestSuccessAction,
  deleteUnitRequestSuccessAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,

  deleteItemRequestAction,
  deleteItemRequestFailAction,
  deleteItemRequestSuccessAction,
} = typesSlice['actions'];

export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectUnits = (state) => state[REDUCER_NAME]['units'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectInFormProcess = (state) => state[REDUCER_NAME]['inFormProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
