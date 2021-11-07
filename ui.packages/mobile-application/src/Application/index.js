
import { on, off } from '@ui.packages/socket';
import { checkSubscription, subscribeUser } from '@ui.packages/web-push';
import { Confirm, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Router from '../Router';
import Loading from '../Loading';

import ApplicationContext from "../Context";
import { useGetProfile, useRedirect } from '../hooks';

import { isLoadedAction, selectIsLoaded, updateCustomerAction } from '../ducks/slice';

import styles from './default.module.scss';


function Application({ options }) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsLoaded);

  const [isPushNotifications, setPushNotifications] = useState(true);

  if (options['useSignIn']) {
    useRedirect();
    useGetProfile();
  }
  else {
    dispatch(isLoadedAction());
  }

  if (options['useSignIn']) {
    useEffect(function () {
      on(process.env['REACT_APP_SOCKET_CUSTOMER_UPDATE'], function(data) {
        dispatch(updateCustomerAction(data));
      });
      return () => {
        off(process.env['REACT_APP_SOCKET_CUSTOMER_UPDATE']);
      };
    }, []);
  }

  useEffect(async () => {
    setPushNotifications(await checkSubscription());
  }, []);

  useEffect(() => {
    if ( ! isPushNotifications) {
      dispatch(openDialog('push-subscribe'));
    }
  }, [isPushNotifications]);

  async function handleSubscribe() {
    await subscribeUser(window.localStorage.getItem('userUuid'));
    dispatch(closeDialog());
  }

  return (
    <section className={styles['application']}>
      <ApplicationContext.Provider value={{ ...options }}>
        {isLoaded
          ? <Router />
          : <Loading />}
      </ApplicationContext.Provider>
      { ! isPushNotifications && (
        <Confirm
          name={'push-subscribe'}
          message={'Вы хотели бы получать информацию о статусе заказа посредством пуш-уведомлений?'}
          onApply={() => handleSubscribe()}
        />
      )}
    </section>
  );
}

export default Application;
