
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isPushSubscribe: false,
  inProcess: false,
};

const REDUCER_NAME = 'options';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['isPushSubscribe'] = false;
      state['inProcess'] = false;
    },

    checkPushSubscriptionAction(state) {
      state['inProcess'] = true;
    },
    checkPushSubscriptionFailAction(state) {
      state['inProcess'] = false;
    },
    checkPushSubscriptionSuccessAction(state, { payload }) {
      state['isPushSubscribe'] = payload;
      state['inProcess'] = false;
    },

    subscribePushSubscriptionAction(state) {
      state['inProcess'] = true;
    },
    subscribePushSubscriptionFailAction(state) {
      state['inProcess'] = false;
    },
    subscribePushSubscriptionSuccessAction(state, { payload }) {
      state['isPushSubscribe'] = payload;
      state['inProcess'] = false;
    },

    unsubscribePushSubscriptionAction(state) {
      state['inProcess'] = true;
    },
    unsubscribePushSubscriptionFailAction(state) {
      state['inProcess'] = false;
    },
    unsubscribePushSubscriptionSuccessAction(state, { payload }) {
      state['isPushSubscribe'] = payload;
      state['inProcess'] = false;
    }
  },
});

export const {
  resetStateAction,

  checkPushSubscriptionAction,
  checkPushSubscriptionFailAction,
  checkPushSubscriptionSuccessAction,

  subscribePushSubscriptionAction,
  subscribePushSubscriptionFailAction,
  subscribePushSubscriptionSuccessAction,

  unsubscribePushSubscriptionAction,
  unsubscribePushSubscriptionFailAction,
  unsubscribePushSubscriptionSuccessAction,
} = slice['actions'];

export const selectIsPushSubscribe = (state) => state[REDUCER_NAME]['isPushSubscribe'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
