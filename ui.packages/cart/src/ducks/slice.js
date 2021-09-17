
import { isJSON } from '@ui.packages/utils';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uuid: [],
  items: [],
  amount: [],
  isOpen: false,
  inProcess: true,
};

const REDUCER_NAME = 'cart';


export const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['amount'] = [];
      state['isOpen'] = false;
      state['inProcess'] = true;
    },

    openCartAction(state) {
      state['isOpen'] = true;
    },
    closeCartAction(state) {
      state['isOpen'] = false;
    },

    plusQuantityAction(state, { payload }) {
      const index = state['uuid'].findIndex((item) => {
        if (item[0] === payload['uuid']) {
          if (item[2] && item[2]['id'] === payload['options']['id']) {
            return true;
          }
        }
        return false;
      });
      if (index > -1) {
        state['uuid'][index][1] += 1;
      }
      window.localStorage.setItem('cart', JSON.stringify(state['uuid']));
    },
    minusQuantityAction(state, { payload }) {
      const index = state['uuid'].findIndex((item) => {
        if (item[0] === payload['uuid']) {
          if (item[2] && item[2]['id'] === payload['options']['id']) {
            return true;
          }
        }
        return false;
      });
      if (index > -1) {
        if (state['uuid'][index][1] > 1) {
          state['uuid'][index][1] -= 1;
        }
      }
      window.localStorage.setItem('cart', JSON.stringify(state['uuid']));
    },

    addProductToCartAction(state, { payload }) {
      let newItems;
      const hasItem = state['uuid'].some((item) => {
        if (item[0] === payload['uuid']) {
          if (item[2] && item[2]['vendor'] === payload['options']['vendor']) {
            return true;
          }
        }
        return false;
      });

      if (hasItem) {
        newItems = state['uuid'].map(item => {
          if (item[0] === payload['uuid']) {
            if (item[2] && item[2]['id'] === payload['options']['id']) {
              return [item[0], ++item[1], item[2]];
            }
          }
          return item;
        });
      }
      else {
        newItems = [
          ...state['uuid'],
          [payload['uuid'], 1, payload['options']],
        ];
      }
      state['uuid'] = newItems;
      window.localStorage.setItem('cart', JSON.stringify(newItems));
    },
    removeProductFromCartAction(state, { payload }) {
      if (payload['options']) {
        state['uuid'] = state['uuid'].filter((item) => item[2]['vendor'] !== payload['options']['vendor']);
      }
      else {
        state['uuid'] = state['uuid'].filter((item) => item[0] !== payload['uuid']);
      }
      window.localStorage.setItem('cart', JSON.stringify(state['uuid']));
    },

    restoreCartAction(state) {
      const store = localStorage.getItem('cart');

      if (store) {
        if (isJSON(store)) {
          state['uuid'] = JSON.parse(store);
        }
        else {
          localStorage.setItem('cart', '[]');
        }
      }
    },
    resetCartAction(state) {
      state['uuid'] = [];
      state['items'] = [];
      state['amount'] = [];
      localStorage.removeItem('cart');
      localStorage.setItem('cart', '[]');
    },

    getCartRequestAction(state) {
      state['inProcess'] = true;
    },
    getCartRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCartRequestSuccessAction(state, { payload }) {
      state['items'] = payload['products'];
      state['amount'] = payload['amount'];
      state['inProcess'] = false;
    }
  },
});

export const {
  resetStateAction,

  openCartAction,
  closeCartAction,

  plusQuantityAction,
  minusQuantityAction,

  addProductToCartAction,
  removeProductFromCartAction,

  resetCartAction,
  restoreCartAction,

  getCartRequestAction,
  getCartRequestFailAction,
  getCartRequestSuccessAction,
} = slice['actions'];

export const selectUuid = (state) => state[REDUCER_NAME]['uuid'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectAmount = (state) => state[REDUCER_NAME]['amount'];
export const selectIsOpen = (state) => state[REDUCER_NAME]['isOpen'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
