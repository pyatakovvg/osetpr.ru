
import {
  CREATE_TABS,
  REMOVE_TABS,

  SET_ACTIVE_TAB,
} from './types';


export const createTabsAction = (name, tabName) => ({
  type: CREATE_TABS,
  payload: { name, tabName },
});

export const removeTabsAction = (name) => ({
  type: REMOVE_TABS,
  payload: name ,
});

export const setActiveTabAction = (name, tabName) => ({
  type: SET_ACTIVE_TAB,
  payload: { name, tabName },
});
