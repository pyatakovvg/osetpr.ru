
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,

  updateOrderRequestAction,
  updateOrderRequestFailAction,
  updateOrderRequestSuccessAction,
} from './slice';


export const getOrder = (userUuid) => async (dispatch) => {
  try {
    dispatch(getOrderRequestAction());

    const result = await request({
      url: '/orders',
      method: 'get',
      params: {
        userUuid,
      }
    });

    dispatch(getOrderRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getOrderRequestFailAction());
  }
};

export const updateOrder = (userUuid, order) => async (dispatch) => {
  try {
    dispatch(updateOrderRequestAction(order['uuid']));

    let result;

    if (order['uuid']) {
      result = await request({
        url: '/orders',
        method: 'put',
        data: {
          userUuid,
          uuid: order['uuid'],
          address: order['address'] || null,
          products: order['products'],
          customer: order['customer'] || null,
          paymentCode: order['payment'] ? order['payment']['code'] : null,
        }
      });
    }
    else {

      result = await request({
        url: '/orders',
        method: 'post',
        data: {
          userUuid,
          dateTo: Date.now(),
          title: 'Клиентский',
          address: order['address'],
          products: order['products'],
          customer: order['customer'],
          paymentCode: order['paymentCode'],
        }
      });
    }

    dispatch(updateOrderRequestSuccessAction(result['data']));

    return true;
  }
  catch(error) {

    dispatch(updateOrderRequestFailAction(order['uuid']));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
    }));

    return false;
  }
};
