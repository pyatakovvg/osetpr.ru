
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,
} from './slice';


export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params: {
        ...params,
      },
    });

    dispatch(getProductsRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getProductsRequestFailAction());
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      autoClose: false,
    }));
  }
};
