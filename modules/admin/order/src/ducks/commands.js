
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/admin-notifications';

import {
  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getCustomersRequestAction,
  getCustomersRequestFailAction,
  getCustomersRequestSuccessAction,

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


export const getCustomers = () => async (dispatch) => {
  try {
    dispatch(getCustomersRequestAction());

    const result = await request({
      url: '/users',
      method: 'get',
      params: {
        roleCode: ['customer', 'wholesale'],
      },
    });

    dispatch(getCustomersRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getCustomersRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params: {
        isUse: true,
        ...params,
      },
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
      url: '/orders/' + uuid,
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
      url: '/orders',
      method: 'post',
      data: {
        ...data,
        statusCode: 'new',
        products: data['products'].map((item) => ({
          productUuid: item['productUuid'],
          title: item['title'],
          vendor: item['vendor'],
          value: item['value'],
          currencyCode: item['currency']['code'],
          price: item['price'],
          number: item['number'],
        })),
      },
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
      data: {
        ...data,
        products: data['products'].map((item) => ({
          productUuid: item['productUuid'],
          title: item['title'],
          vendor: item['vendor'],
          value: item['value'],
          currencyCode: item['currency']['code'],
          price: item['price'],
          number: item['number'],
        })),
      },
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

