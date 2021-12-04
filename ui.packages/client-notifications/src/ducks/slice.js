
import { UUID } from "@ui.packages/utils";
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
};


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    closeNotification(state, { payload }) {
      state['items'] = state['items'].filter(item => item['uuid'] !== payload);
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

export const { closeNotification, pushNotification, cleanNotifications } = notificationSlice['actions'];

export const selectNotifications = (state) => state['notifications']['items'];

export const reducer = notificationSlice['reducer'];
