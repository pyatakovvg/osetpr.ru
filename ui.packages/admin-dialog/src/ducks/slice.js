
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'dialog';

const initialState = {
  isOpen: false,
  name: null,
  data: null,
};


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    openDialogAction(state, { payload }) {
      state['isOpen'] = true;
      state['name'] = payload['name'];
      state['data'] = payload['data'];
    },
    closeDialogAction(state) {
      state['isOpen'] = false;
      state['name'] = null;
      state['data'] = null;
    }
  },
});

export const { openDialogAction, closeDialogAction } = slice['actions'];

export const selectIsOpen = (state) => state[REDUCER_NAME]['isOpen'];
export const selectName = (state) => state[REDUCER_NAME]['name'];
export const selectData = (state) => state[REDUCER_NAME]['data'];

export const name = slice['name'];
export const reducer = slice['reducer'];
