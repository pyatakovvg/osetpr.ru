
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,
} from './slice';


export const getOrder = (externalId, userUuid) => async (dispatch) => {
  try {
    dispatch(getOrderRequestAction());

    const result = await request({
      url: '/orders/' + externalId,
      method: 'get',
      params: {
        userUuid,
      },
    });

    dispatch(getOrderRequestSuccessAction(result['data']));
  }
  catch(error) {
console.log(error)
    dispatch(getOrderRequestFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};
