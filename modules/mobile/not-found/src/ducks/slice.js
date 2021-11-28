
import { createSlice } from '@reduxjs/toolkit';


const initialState = {};

const REDUCER_NAME = 'not-found';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
});

export const {} = slice['actions'];

export const name = slice['name'];
export const reducer = slice['reducer'];
