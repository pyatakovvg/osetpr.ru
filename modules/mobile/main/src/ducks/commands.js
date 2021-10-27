
import request from '@ui.packages/request';

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

    dispatch(getProductsRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getProductsRequestFailAction());
  }
};
