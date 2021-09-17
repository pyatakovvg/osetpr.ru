
import {
  CREATE_TABS,
  REMOVE_TABS,

  SET_ACTIVE_TAB,
} from './types';


const initialState = {};

export const KEY = 'tabs';

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_TABS: return {
      ...state,
      [payload['name']]: {
        activeTab: payload['tabName'],
      }
    };

    case REMOVE_TABS: {
      const tabs = state;
      delete tabs[payload];
      return {
        ...state,
        ...tabs
      };
    }

    case SET_ACTIVE_TAB: return {
      ...state,
      [payload['name']]: {
        activeTab: payload['tabName'],
      }
    };

    default: return { ...state };
  }
}
