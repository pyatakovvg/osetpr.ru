
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/admin-notifications';

import {
  getItemRequestAction,
  getItemRequestFailAction,
  getItemRequestSuccessAction,

  getPlansRequestAction,
  getPlansRequestFailAction,
  getPlansRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,
} from './slice';


export const getItem = (uuid, options) => async (dispatch) => {
  try {
    dispatch(getItemRequestAction());

    const result = await request({
      url: '/customers/' + uuid,
      method: 'get',
    }, {
      ...options,
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

export const getPlans = () => async (dispatch) => {
  try {
    dispatch(getPlansRequestAction());

    const result = await request({
      url: '/plans',
      method: 'get',
    });

    console.log(result)

    dispatch(getPlansRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getPlansRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
}

export const updateCustomer = (data) => async (dispatch) => {
  try {
    dispatch(updateCustomerRequestAction());

    const result = await request({
      url: '/customers/' + data['uuid'],
      method: 'put',
      data: data,
    });

    dispatch(updateCustomerRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(updateCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
}
