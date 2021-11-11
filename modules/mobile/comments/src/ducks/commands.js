
import request from '@ui.packages/request';

import {
  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,
} from './slice';


export const getComments = () => async (dispatch) => {
  try {
    dispatch(getCommentsRequestAction());

    const result = await request({
      url: '/comments',
      method: 'get',
    });

    dispatch(getCommentsRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getCommentsRequestFailAction());
  }
};
