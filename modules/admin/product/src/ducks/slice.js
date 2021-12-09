
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  groups: [],
  categories: [],
  currencies: [],
  gallery: [],
  product: {},
  inProcess: false,
  inCreateProcess: false,
};

const REDUCER_NAME = 'product-modify';


const productModifySlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['groups'] = [];
      state['categories'] = [];
      state['currencies'] = [];
      state['gallery'] = [];
      state['product'] = {};
      state['inProcess'] = false;
      state['inFormProcess'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getGroupsRequestAction() {},
    getGroupsRequestFailAction() {},
    getGroupsRequestSuccessAction(state, { payload }) {
      state['groups'] = payload;
    },

    getCategoriesRequestAction() {},
    getCategoriesRequestFailAction() {},
    getCategoriesRequestSuccessAction(state, { payload }) {
      state['categories'] = payload;
    },

    getCurrenciesRequestAction() {},
    getCurrenciesRequestFailAction() {},
    getCurrenciesRequestSuccessAction(state, { payload }) {
      state['currencies'] = payload;
    },

    getProductRequestAction() {},
    getProductRequestFailAction() {},
    getProductRequestSuccessAction(state, { payload }) {
      state['product'] = payload;
    },

    updateProductRequestAction(state) {
      state['inProcess'] = true;
    },
    updateProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = payload;
    },

    createProductRequestAction(state) {
      state['inProcess'] = true;
    },
    createProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createProductRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    deleteImageRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteImageRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteImageRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = {
        ...state['product'],
        gallery: state['product']['gallery'].filter((item) => (payload['uuid'].indexOf(item) === -1)),
      };
    },

    getGalleryRequestAction(state) {},
    getGalleryRequestFailAction(state) {},
    getGalleryRequestSuccessAction(state, { payload }) {
      state['gallery'] = payload;
    },

    createGalleryRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createGalleryRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createGalleryRequestSuccessAction(state, { payload }) {
      if ( ! state['gallery'].some((item) => item['uuid'] === payload['uuid'])) {
        state['gallery'] = [...payload, ...state['gallery']];
      }
      state['inCreateProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  setProcessAction,

  getGroupsRequestAction,
  getGroupsRequestFailAction,
  getGroupsRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  createProductRequestAction,
  createProductRequestFailAction,
  createProductRequestSuccessAction,

  updateProductRequestAction,
  updateProductRequestFailAction,
  updateProductRequestSuccessAction,

  deleteImageRequestAction,
  deleteImageRequestFailAction,
  deleteImageRequestSuccessAction,

  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  createGalleryRequestAction,
  createGalleryRequestFailAction,
  createGalleryRequestSuccessAction,
} = productModifySlice['actions'];

export const selectGroups = (state) => state[REDUCER_NAME]['groups'];
export const selectGallery = (state) => state[REDUCER_NAME]['gallery'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectCurrencies = (state) => state[REDUCER_NAME]['currencies'];
export const selectInCreateProcess = (state) => state[REDUCER_NAME]['inCreateProcess'];

export const name = productModifySlice['name'];
export const reducer = productModifySlice['reducer'];
