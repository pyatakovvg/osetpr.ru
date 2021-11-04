
import { UUID } from "@ui.packages/utils";
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'widget-notifications';

const initialState = {
  items: [],
};


export const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    closeNotification(state, { payload }) {
      state['items'] = state['items'].filter((item) => item['uuid'] !== payload);
    },
    pushNotification(state, { payload }) {
      const item = { ... payload };
      item['uuid'] = UUID();
      state['items'] = [item, ...state['items']];
    },
    cleanNotifications(state) {
      state['items'] = [];
    }
  },
});

export const {
  closeNotification,
  pushNotification,
  cleanNotifications,
} = slice['actions'];

export const selectNotifications = (state) => state[REDUCER_NAME]['items'];

export const name = slice['name'];
export const reducer = slice['reducer'];
