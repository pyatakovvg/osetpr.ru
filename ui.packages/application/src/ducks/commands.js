
import request from "@ui.packages/request";
import { pushNotification } from "@ui.packages/notifications";
import { joinToRoom, leaveFromRoom } from '@ui.packages/socket';

import {
  signInRequestAction,
  signInRequestFailAction,
  signInRequestSuccessAction,

  signUpRequestAction,
  signUpRequestFailAction,
  signUpRequestSuccessAction,

  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  signOutRequestAction,
  signOutRequestFailAction,
  signOutRequestSuccessAction,
} from './slice';


export const getProfile = () => async (dispatch) => {
  try {
    dispatch(getProfileRequestAction());

    const { data } = await request({
      url: '/profile',
      method: 'get',
      data: {},
    });

    dispatch(getProfileRequestSuccessAction(data));
    joinToRoom(data['id']);

    return data;
  }
  catch(error) {

    dispatch(getProfileRequestFailAction(error));

    throw error;
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    dispatch(signInRequestAction());

    const result = await request({
      url: '/sign-in',
      method: 'post',
      data: {
        ...formData,
      }
    });

    await dispatch(getProfile());

    dispatch(signInRequestSuccessAction(result));

    return true;
  }
  catch(error) {
    dispatch(signInRequestFailAction(error));

    const notification = {
      mode: '',
      title: '',
      content: '',
      autoClose: false,
    };

    if (error['status'] === 404) {
      notification['mode'] = 'warning';
      notification['title'] = 'Ошибка авторизации';
      notification['content'] = 'Не верный логин или пароль';
    }
    else if (error['status'] === 500) {
      notification['mode'] = 'danger';
      notification['title'] = 'Ошибка доступа';
      notification['content'] = `${error['data']['message']} (${error['data']['code']})`;
    }

    dispatch(pushNotification(notification));

    return false;
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch(signUpRequestAction());

    const result = await request({
      url: '/sign-up',
      method: 'post',
      data: {
        ...formData,
      }
    });

    await dispatch(getProfile());

    dispatch(signUpRequestSuccessAction(result));

    return true;
  }
  catch(error) {
    dispatch(signUpRequestFailAction(error));

    const notification = {
      mode: '',
      title: '',
      content: '',
      autoClose: false,
    };

    if (error['status'] === 404) {
      notification['mode'] = 'warning';
      notification['title'] = 'Ошибка авторизации';
      notification['content'] = 'Не верный логин или пароль';
    }
    else if (error['status'] === 500) {
      notification['mode'] = 'danger';
      notification['title'] = 'Ошибка доступа';
      notification['content'] = `${error['data']['message']} (${error['data']['code']})`;
    }

    dispatch(pushNotification(notification));

    return false;
  }
};

export const signOut = (userId) => async (dispatch) => {
  try {
    dispatch(signOutRequestAction());

    await request({
      url: '/sign-out',
      method: 'post',
    });

    leaveFromRoom(userId);
    dispatch(signOutRequestSuccessAction());

    return true;
  }
  catch(error) {

    dispatch(signOutRequestFailAction(error));

    return false;
  }
};
