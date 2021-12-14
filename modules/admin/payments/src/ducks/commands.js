
import { UnauthorizedError } from "@packages/errors";

import request from "@ui.packages/request";
import { pushNotification } from "@ui.packages/admin-notifications";

import {
  getItemsRequestAction,
  getItemsRequestActionFail,
  getItemsRequestActionSuccess,

  updateItemsRequestAction,
  updateItemsRequestActionFail,
  updateItemsRequestActionSuccess,
} from './slice';


export const getPayments = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/payments',
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

export const updatePayments = (data) => async (dispatch) => {
  try {
    dispatch(updateItemsRequestAction());

    await request({
      url: '/payments',
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
      url: '/payments',
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
