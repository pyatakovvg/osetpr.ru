
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,
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
