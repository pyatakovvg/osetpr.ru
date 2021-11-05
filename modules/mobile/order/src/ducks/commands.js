
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,
} from './slice';


export const getOrder = (uuid, userUuid) => async (dispatch) => {
  try {
    dispatch(getOrderRequestAction());

    const result = await request({
      url: '/orders',
      method: 'get',
      params: {
        uuid,
        userUuid,
      },
    });

    dispatch(getOrderRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getOrderRequestFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};
