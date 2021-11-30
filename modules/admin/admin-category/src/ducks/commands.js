
import { UnauthorizedError } from "@packages/errors";

import request from "@ui.packages/request";
import { pushNotification } from "@ui.packages/notifications";

import {
  getItemsRequestAction,
  getItemsRequestActionFail,
  getItemsRequestActionSuccess,

  updateItemsRequestAction,
  updateItemsRequestActionFail,
  updateItemsRequestActionSuccess,
} from './slice';


export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/categories',
      method: 'get',
    });

    dispatch(getItemsRequestActionSuccess(result['data']));
  }
  catch(error) {
    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(getItemsRequestActionFail(error));
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};

export const updateCategories = (data) => async (dispatch) => {
  try {
    dispatch(updateItemsRequestAction());

    await request({
      url: '/categories',
      method: 'put',
      data: {
        bulk: data,
      },
    });

    const result = await request({
      url: '/categories',
      method: 'get',
    });

    dispatch(updateItemsRequestActionSuccess(result['data']));
  }
  catch(error) {
    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(updateItemsRequestActionFail(error));
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};
