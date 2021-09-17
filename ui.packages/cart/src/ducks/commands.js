
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getCartRequestAction,
  getCartRequestFailAction,
  getCartRequestSuccessAction,
} from './slice';


export const getCart = (uuid, token) => async (dispatch) => {
  try {
    dispatch(getCartRequestAction());

    const result = await request({
      url: '/cart',
      method: 'post',
      cancelToken: token['token'],
      data: {
        uuid,
      }
    });

    if (result['data']) {
      dispatch(getCartRequestSuccessAction(result['data']));
    }
  }
  catch(error) {

    dispatch(getCartRequestFailAction(error));
    dispatch(pushNotification({
      content: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};
