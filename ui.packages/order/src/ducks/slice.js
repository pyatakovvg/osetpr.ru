
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'order-widget';

const initialState = {
  products: [],
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    addProductAction(state, { payload }) {
      const productIndex = state['products'].findIndex((item) => item[0] === payload['uuid']);

      if (productIndex > -1) {
        const product = { ...state['products'][productIndex] };
        const modeIndex = product[1].findIndex((item) => item[0] === payload['modeUuid']);
        if (modeIndex > -1) {
          state['products'] = [
            ...state['products'].slice(0, productIndex),
            [
              product[0],
              [
                ...product[1].slice(0, modeIndex),
                [
                  product[1][modeIndex][0],
                  product[1][modeIndex][1] + 1
                ],
                ...product[1].slice(modeIndex + 1),
              ]
            ],
            ...state['products'].slice(productIndex + 1 )
          ];
        }
        else {
          state['products'] = [
            ...state['products'].slice(0, productIndex),
            [
              product[0],
              [
                ...product[1].slice(0, modeIndex),
                [payload['modeUuid'], 1],
                ...product[1].slice(modeIndex + 1),
              ]
            ],
            ...state['products'].slice(productIndex + 1 )
          ];
        }
      }
      else {
        state['products'] = [
          ...state['products'],
          [payload['uuid'], [[payload['modeUuid'], 1]]],
        ];
      }
    },
    removeProductAction(state, { payload }) {

    },
    removeAllProductsAction(state) {
      state['products'] = [];
    }
  },
});

export const {
  addProductAction,
  removeProductAction,
  removeAllProductsAction,
} = slice['actions'];

export const selectProducts = (state) => state[REDUCER_NAME]['products'];

export const name = slice['name'];
export const reducer = slice['reducer'];