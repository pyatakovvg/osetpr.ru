
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  step: 1,
};

const REDUCER_NAME = 'sign-up';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    nextStepAction(state) {
      state['step'] += 1;
    },
  },
});

export const {
  nextStepAction,
} = slice['actions'];

export const selectStep = (state) => state[REDUCER_NAME]['step'];

export const name = slice['name'];
export const reducer = slice['reducer'];
