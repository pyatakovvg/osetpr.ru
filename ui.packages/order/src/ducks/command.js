
import request from '@ui.packages/request';

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
    dispatch(updateOrderRequestAction());

    let result;

    if (order['uuid']) {
      result = await request({
        url: '/orders',
        method: 'put',
        data: {
          userUuid,
          uuid: order['uuid'],
          address: order['address'],
          products: order['products'],
          customer: order['customer'],
          paymentCode: order['paymentCode'],
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
  }
  catch(error) {

    dispatch(updateOrderRequestFailAction());
  }
};
