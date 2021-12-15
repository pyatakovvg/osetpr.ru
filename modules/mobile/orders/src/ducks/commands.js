
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getOrdersRequestAction,
  getOrdersRequestFailAction,
  getOrdersRequestSuccessAction,
} from './slice';


export const getOrders = (userUuid) => async (dispatch) => {
  try {
    dispatch(getOrdersRequestAction());

    const result = await request({
      url: '/orders',
      method: 'get',
      params: {
        userUuid,
      },
    });

    dispatch(getOrdersRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getOrdersRequestFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};
