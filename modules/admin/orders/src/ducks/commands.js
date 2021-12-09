
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/admin-notifications';

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  updateStateItemRequestAction,
  updateStateItemRequestFailAction,
  updateStateItemRequestSuccessAction,
} from './slice';


export const getItems = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/orders',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result));
  }
  catch(error) {
    dispatch(getItemsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const updateStatus = (uuid, status) => async (dispatch) => {
  try {
    dispatch(updateStateItemRequestAction(uuid));

    const result = await request({
      url: '/orders/' + uuid + '/status',
      method: 'put',
      data: {
        statusCode: status,
      },
    });

    dispatch(updateStateItemRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(updateStateItemRequestFailAction(uuid));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};
