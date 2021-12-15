
import { UnauthorizedError, NotfoundError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/admin-notifications';

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  deleteItemRequestAction,
  deleteItemRequestFailAction,
  deleteItemRequestSuccessAction,
} from './slice';


export const getItems = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/comments',
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

export const getItem = (uuid) => async (dispatch) => {
  try {
    dispatch(getItemRequestAction());

    const result = await request({
      url: '/comments',
      method: 'get',
      params: {
        uuid,
      },
    });

    if ( ! result['data'].length) {
      throw new NotfoundError({ code: '1.2.3', message: 'Комментарий не найден' });
    }

    dispatch(getItemRequestSuccessAction(result['data'][0]));
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

    await request({
      url: '/comments',
      method: 'post',
      data: {
        ...data,
      }
    });

    const result = await request({
      url: '/comments',
      method: 'get',
    });

    dispatch(createItemRequestSuccessAction(result));

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

export const deleteItem = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteItemRequestAction());

    await request({
      url: '/comments',
      method: 'delete',
      data: {
        uuid,
      }
    });

    const result = await request({
      url: '/comments',
      method: 'get',
    });

    dispatch(deleteItemRequestSuccessAction(result));

    return true;
  }
  catch(error) {
    dispatch(deleteItemRequestFailAction(error));

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
