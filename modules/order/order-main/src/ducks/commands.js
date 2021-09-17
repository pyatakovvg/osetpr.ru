
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,

  deleteItemRequestAction,
  deleteItemRequestFailAction,
  deleteItemRequestSuccessAction,
} from './slice';


export const getUnits = () => async (dispatch) => {
  try {
    dispatch(getUnitsRequestAction());

    const result = await request({
      url: '/units',
      method: 'get',
    });

    dispatch(getUnitsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getUnitsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const getItems = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/attributes',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result['data']));
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

export const getItem = (id) => async (dispatch) => {
  try {
    dispatch(getItemRequestAction());

    const { data } = await request({
      url: '/attributes',
      method: 'get',
      params: { id },
    });

    const item = {
      id: data[0]['id'],
      value: data[0]['value'],
      type: data[0]['type'],
      unitId: data[0]['unit'] ? data[0]['unit']['id'] : null,
      description: data[0]['description'],
    };

    dispatch(getItemRequestSuccessAction(item));
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

export const createItem = (formData) => async (dispatch) => {
  try {
    dispatch(createItemRequestAction());

    const { data } = await request({
      url: '/attributes',
      method: 'post',
      data: {
        value: formData['value'],
        type: formData['type'],
        unitId: formData['unitId'] || null,
        description: formData['description'] || null,
      },
    });

    dispatch(createItemRequestSuccessAction(data));
    dispatch(closeDialog('attribute'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));
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
  }
};

export const updateItem = (formData) => async (dispatch) => {
  try {
    dispatch(updateItemRequestAction());

    const { data } = await request({
      url: '/attributes/' + formData['id'],
      method: 'put',
      data: {
        value: formData['value'],
        type: formData['type'],
        unitId: formData['unitId'] || null,
        description: formData['description'] || null,
      },
    });

    dispatch(updateItemRequestSuccessAction(data));
    dispatch(closeDialog('attribute'));
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

export const deleteItem = (ids) => async (dispatch) => {
  try {
    dispatch(deleteItemRequestAction());

    await request({
      url: '/attributes',
      method: 'delete',
      data: { id: ids }
    });

    dispatch(deleteItemRequestSuccessAction(ids));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно',
    }));
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
  }
};
