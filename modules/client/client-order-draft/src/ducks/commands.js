
import request from '@ui.packages/request';

import {
  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,
} from './slice';


export const getPayments = () => async (dispatch) => {
  try {
    dispatch(getPaymentsRequestAction());

    const result = await request({
      url: '/payments',
      method: 'get',
    });

    dispatch(getPaymentsRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getPaymentsRequestFailAction());
  }
};
