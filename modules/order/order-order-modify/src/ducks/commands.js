
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
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
    console.log(error)
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

export const createItem = (data) => async (dispatch) => {
  try {
    dispatch(createItemRequestAction());

    const result = await request({
      url: '/orders',
      method: 'post',
      data,
    });

    dispatch(createItemRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Заказ успешно добавлен',
    }));

    return true;
  }
  catch(error) {
    dispatch(createItemRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));

    return false;
  }
};

export const updateItem = (data) => async (dispatch) => {
  try {
    dispatch(updateItemRequestAction());

    const result = await request({
      url: '/orders/' + data['uuid'],
      method: 'put',
      data,
    });

    dispatch(updateItemRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Заказ успешно обновлен',
    }));

    return true;
  }
  catch(error) {
    dispatch(updateItemRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));

    return false;
  }
};
