
import request from '@ui.packages/request';

import {
  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} from './slice';


export const getProduct = (uuid) => async (dispatch) => {
  try {
    dispatch(getProductRequestAction());

    const result = await request({
      url: '/products/' + uuid,
      method: 'get',
    });

    dispatch(getProductRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getProductRequestFailAction());
  }
};
