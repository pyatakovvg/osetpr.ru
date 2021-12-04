
import { combineReducers, configureStore } from '@reduxjs/toolkit';


export default function initStore(reducers = {}, middleware = []) {
  return configureStore({
    reducer: combineReducers(reducers),
    middleware: [...middleware],
    devTools: process.env['NODE_ENV'] === 'development',
  });
}
