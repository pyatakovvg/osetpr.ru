
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/mobile-notifications';

import {
  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
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
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};


export const createComment = (data) => async (dispatch) => {
  try {
    dispatch(createCommentRequestAction());

    const result = await request({
      url: '/comments',
      method: 'post',
      data: {
        ...data,
        userUuid: window.localStorage.getItem('userUuid'),
      },
    });

    dispatch(createCommentRequestSuccessAction(result['data']));

    return true;
  }
  catch(error) {

    dispatch(createCommentRequestFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));

    return false;
  }
};
