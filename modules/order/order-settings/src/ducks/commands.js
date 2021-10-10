
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getCustomerRequestAction,
  getCustomerRequestFailAction,
  getCustomerRequestSuccessAction,

  changePasswordRequestAction,
  changePasswordRequestFailAction,
  changePasswordRequestSuccessAction,
} from './slice';


export const getCustomer = () => async (dispatch) => {
  try {
    dispatch(getCustomerRequestAction());

    const result = await request({
      url: '/customers',
      method: 'get',
      params: {
        uuid,
      }
    });

    dispatch(getCustomerRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};

export const changePassword = (password) => async (dispatch) => {
  try {
    dispatch(changePasswordRequestAction());

    const result = await request({
      url: '/users/change/password',
      method: 'post',
      params: {
        password,
      }
    });

    dispatch(changePasswordRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(changePasswordRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции',
    }));
  }
};
