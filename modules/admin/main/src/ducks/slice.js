
import { createSlice } from '@reduxjs/toolkit';


const initialState = {};

const REDUCER_NAME = 'main';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
});

export const {} = typesSlice['actions'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
