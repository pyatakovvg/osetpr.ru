
import { combineReducers } from 'redux';


export default function reducers(asyncReducers = {}) {
  return combineReducers(asyncReducers);
};
