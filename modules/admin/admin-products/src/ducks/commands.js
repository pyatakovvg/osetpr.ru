
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  removeItemRequestAction,
  removeItemRequestFailAction,
  removeItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
} from './slice';


export const getItems = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result));
  }
  catch(error) {
    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(getItemsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const removeItem = (uuid) => async (dispatch) => {
  try {
    dispatch(removeItemRequestAction());

    const result = await request({
      url: '/products',
      method: 'delete',
      data: {
        uuid,
      }
    });

    dispatch(removeItemRequestSuccessAction(result));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));
  }
  catch(error) {
    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(removeItemRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
      content: error['data']['message'],
      autoClose: false,
    }));
  }
};

export const updateItem = (uuid, data) => async (dispatch) => {
  try {
    dispatch(updateItemRequestAction(uuid));

    const result = await request({
      url: '/products/' + uuid,
      method: 'put',
      data,
    });

    dispatch(updateItemRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));
  }
  catch(error) {
    if (error instanceof UnauthorizedError) {
      return void 0;
    }
console.log(error)
    dispatch(updateItemRequestFailAction(uuid));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
      content: error['data']['message'],
      autoClose: false,
    }));
  }
};
