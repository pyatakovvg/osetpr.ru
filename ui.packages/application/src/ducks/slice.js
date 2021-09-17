
import { createSlice, createAction } from '@reduxjs/toolkit';


export const redirectToAction = createAction('redirect');

const REDUCER_NAME = 'application';

const initialState = {
  profile: null,
  isAuth: false,
  isLoaded: false,
  inProcess: false,
  redirectTo401: false,
};


const applicationSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['profile'] = null;
      state['isAuth'] = false;
      state['inProcess'] = false;
      state['redirectTo401'] = false;
    },

    isLoadedAction(state) {
      state['isLoaded'] = true;
    },

    signInRequestAction(state) {
      state['inProcess'] = true;
    },
    signInRequestFailAction(state) {
      state['inProcess'] = false;
    },
    signInRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    getProfileRequestAction(state) {},
    getProfileRequestFailAction(state) {},
    getProfileRequestSuccessAction(state, { payload }) {
      state['profile'] = payload;
    },

    signOutRequestAction(state) {
      state['inProcess'] = false;
    },
    signOutRequestFailAction(state) {
      state['inProcess'] = false;
    },
    signOutRequestSuccessAction(state) {
      state['inProcess'] = false;
      state['profile'] = null;
    },

    updateCustomerAction(state, { payload }) {
      if (state['profile'] && state['profile']['user']['id'] === payload['id']) {
        state['profile']['user'] = payload;
      }
    }
  },
  extraReducers(build) {
    build
      .addCase(redirectToAction, (state) => {
        state['redirectTo401'] = true;
      });
  }
});

export const {
  isLoadedAction,

  resetStateAction,

  signInRequestAction,
  signInRequestFailAction,
  signInRequestSuccessAction,

  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  signOutRequestAction,
  signOutRequestFailAction,
  signOutRequestSuccessAction,

  updateCustomerAction,
} = applicationSlice['actions'];

export const selectIsAuth = (state) => state[REDUCER_NAME]['isAuth'];
export const selectProfile = (state) => state[REDUCER_NAME]['profile'];
export const selectIsLoaded = (state) => state[REDUCER_NAME]['isLoaded'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectRedirectTo401 = (state) => state[REDUCER_NAME]['redirectTo401'];

export const name = applicationSlice['name'];
export const reducer = applicationSlice['reducer'];
