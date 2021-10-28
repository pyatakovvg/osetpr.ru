
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'order-widget';

const initialState = {
  products: [],
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    addProductAction() {

    },
    removeProductAction() {

    },
    removeAllProductsAction() {

    }
  },
});


export const name = slice['name'];
export const reducer = slice['reducer'];