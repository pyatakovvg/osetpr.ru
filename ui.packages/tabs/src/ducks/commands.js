
import {
  createTabsAction,
  removeTabsAction,

  setActiveTabAction,
} from './actions';


export const createTabs = (name, tabName) => dispatch => {
  dispatch(createTabsAction(name, tabName));
};

export const removeTabs = (name) => dispatch => {
  dispatch(removeTabsAction(name));
};

export const setActiveTab = (name, tabName) => dispatch => {
  dispatch(setActiveTabAction(name, tabName));
};
