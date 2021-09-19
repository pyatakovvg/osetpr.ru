
import { createSlice } from '@reduxjs/toolkit';


const initialState = {};


const signInSlice = createSlice({
  name: 'sign-in',
  initialState,
  reducers: {},
});

export const name = signInSlice['name'];
export const reducer = signInSlice['reducer'];
