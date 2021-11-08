
import { subscribeUser, unsubscribeUser, checkSubscription } from "@ui.packages/web-push";
import { pushNotification } from "@ui.packages/mobile-notifications";

import {
  checkPushSubscriptionAction,
  checkPushSubscriptionFailAction,
  checkPushSubscriptionSuccessAction,

  subscribePushSubscriptionAction,
  subscribePushSubscriptionFailAction,
  subscribePushSubscriptionSuccessAction,

  unsubscribePushSubscriptionAction,
  unsubscribePushSubscriptionFailAction,
  unsubscribePushSubscriptionSuccessAction,
} from './slice';


export const checkPushSubscribe = () => async (dispatch) => {
  try {
    dispatch(checkPushSubscriptionAction());

    const hasSubscribe = await checkSubscription();

    dispatch(checkPushSubscriptionSuccessAction(hasSubscribe));
  }
  catch(error) {
    dispatch(checkPushSubscriptionFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};

export const subscribePushSubscribe = (userUuid) => async (dispatch) => {
  try {
    dispatch(checkPushSubscriptionAction());

    await subscribeUser(userUuid);

    dispatch(checkPushSubscriptionSuccessAction(true));
    dispatch(pushNotification({
      title: 'Успешно установлено',
      content: 'Теперь вы сможете получать push-уведомления',
      mode: 'success',
    }));
  }
  catch(error) {
    dispatch(checkPushSubscriptionFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};

export const unsubscribePushSubscribe = (userUuid) => async (dispatch) => {
  try {
    dispatch(checkPushSubscriptionAction());

    await unsubscribeUser(userUuid);

    dispatch(checkPushSubscriptionSuccessAction(false));
    dispatch(pushNotification({
      title: 'Успешно отключено',
      content: 'Теперь вы не сможете получать push-уведомления',
      mode: 'success',
    }));
  }
  catch(error) {
    dispatch(checkPushSubscriptionFailAction());
    dispatch(pushNotification({
      title: 'Упс! Что-то пошло не так',
      content: error['data']['message'],
      mode: 'danger',
      autoClose: false,
    }));
  }
};
