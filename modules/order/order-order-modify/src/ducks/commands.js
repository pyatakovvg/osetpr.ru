
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,
} from './slice';


export const getItem = (orderId) => async (dispatch) => {
  try {
    dispatch(getItemRequestAction());

    const result = await request({
      url: '/orders/' + orderId,
      method: 'get',
    });

    dispatch(getItemRequestSuccessAction(result));
  }
  catch(error) {
    dispatch(getItemRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};
