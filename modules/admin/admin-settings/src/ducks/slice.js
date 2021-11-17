
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  inProcess: false,
  isPushSubscribe: false,
};

const REDUCER_NAME = 'settings';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['inProcess'] = false;
      state['isPushSubscribe'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
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

  setProcessAction,

  checkPushSubscriptionAction,
  checkPushSubscriptionFailAction,
  checkPushSubscriptionSuccessAction,

  subscribePushSubscriptionAction,
  subscribePushSubscriptionFailAction,
  subscribePushSubscriptionSuccessAction,

  unsubscribePushSubscriptionAction,
  unsubscribePushSubscriptionFailAction,
  unsubscribePushSubscriptionSuccessAction,
} = typesSlice['actions'];

export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectIsPushSubscribe = (state) => state[REDUCER_NAME]['isPushSubscribe'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
