
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'widget-menu';

const initialState = {
  isOpen: false,
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    openMenuAction(state) {
      state['isOpen'] = true;
    },

    closeMenuAction(state) {
      state['isOpen'] = false;
    }
  },
});

export const {
  openMenuAction,
  closeMenuAction,
} = slice['actions'];

export const selectIsOpen = (state) => state[REDUCER_NAME]['isOpen'];

export const name = slice['name'];
export const reducer = slice['reducer'];