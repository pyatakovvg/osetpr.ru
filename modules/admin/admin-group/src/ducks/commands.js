
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


export const getGroups = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/groups',
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

export const updateGroups = (data) => async (dispatch) => {
  try {
    dispatch(updateItemsRequestAction());

    await request({
      url: '/groups',
      method: 'post',
      data: {
        bulk: data['bulk'].map((item, index) => {
          return {
            ...item,
            order: index,
          }
        }),
      },
    });

    const result = await request({
      url: '/groups',
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
