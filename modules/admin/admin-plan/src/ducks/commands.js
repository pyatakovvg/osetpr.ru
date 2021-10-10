
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,
} from './slice';


export const getProducts = () => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
    });

    dispatch(getProductsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getProductsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const getItem = (uuid) => async (dispatch) => {
  try {
    dispatch(getItemRequestAction());

    const result = await request({
      url: '/plans/' + uuid,
      method: 'get',
    });

    dispatch(getItemRequestSuccessAction(result['data']));
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

export const createItem = (data) => async (dispatch) => {
  try {
    dispatch(createItemRequestAction());

    const result = await request({
      url: '/plans',
      method: 'post',
      data: {
        ...data,
      },
    });

    dispatch(createItemRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));

    return result['data'];
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

    return null;
  }
};

export const updateItem = (data) => async (dispatch) => {
  try {
    dispatch(updateItemRequestAction());

    const result = await request({
      url: '/plans/' + data['uuid'],
      method: 'put',
      data: {
        ...data,
      },
    });

    dispatch(updateItemRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));
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
  }
};
