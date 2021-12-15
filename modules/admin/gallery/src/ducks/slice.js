
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  meta: {},
  inProcess: false,
  inCreateProcess: false,
};

const REDUCER_NAME = 'gallery';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getGalleryRequestAction(state) {
      state['inProcess'] = true;
    },
    getGalleryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getGalleryRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    createGalleryRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createGalleryRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createGalleryRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((item) => item['uuid'] === payload['uuid'])) {
        state['items'] = [...payload, ...state['items']];
      }
      state['inCreateProcess'] = false;
    },

    deleteGalleryRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteGalleryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteGalleryRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].filter((item) => ! payload['uuid'].some((uuid) => uuid === item['uuid']));
      state['inProcess'] = false;
    },

    updateGalleryRequestAction(state) {
      state['inProcess'] = true;
    },
    updateGalleryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateGalleryRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  createGalleryRequestAction,
  createGalleryRequestFailAction,
  createGalleryRequestSuccessAction,

  updateGalleryRequestAction,
  updateGalleryRequestFailAction,
  updateGalleryRequestSuccessAction,

  deleteGalleryRequestAction,
  deleteGalleryRequestFailAction,
  deleteGalleryRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectInCreateProcess = (state) => state[REDUCER_NAME]['inCreateProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
