
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
      url: '/basket',
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
    dispatch(updateOrderRequestAction());

    const result = await request({
      url: '/basket',
      method: 'post',
      data: {
        userUuid,
        title: 'Клиентский заказ',
        uuid: order['uuid'] || null,
        dateTo: order['dateTo'] || null,
        description: order['description'] || null,
        statusCode: order['statusCode'] || 'basket',
        address: order['address'] || null,
        products: order['products'],
        customer: order['customer'] || null,
        paymentCode: order['payment'] ? order['payment']['code'] : null,
      }
    });

    dispatch(updateOrderRequestSuccessAction(result['data']));

    return true;
  }
  catch(error) {

    dispatch(updateOrderRequestFailAction());
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
    }));

    return false;
  }
};
