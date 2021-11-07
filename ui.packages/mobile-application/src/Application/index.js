
import { on, off } from '@ui.packages/socket';
import { checkSubscription, subscribeUser, checkServiceWorker } from '@ui.packages/web-push';

import React, { useEffect } from 'react';
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

  if (options['useSignIn']) {
    useRedirect();
    useGetProfile();
  }
  else {
    dispatch(isLoadedAction());
  }

  useEffect(async () => {
    if (checkServiceWorker()) {
      if ( ! await checkSubscription()) {
        await subscribeUser(window.localStorage.getItem('userUuid'));
      }
    }
  }, []);

  useEffect(function () {
    if (options['useSignIn']) {
      on(process.env['REACT_APP_SOCKET_CUSTOMER_UPDATE'], function(data) {
        dispatch(updateCustomerAction(data));
      });
      return () => {
        off(process.env['REACT_APP_SOCKET_CUSTOMER_UPDATE']);
      };
    }
  }, []);

  return (
    <section className={styles['application']}>
      <ApplicationContext.Provider value={{ ...options }}>
        {isLoaded
          ? <Router />
          : <Loading />}
      </ApplicationContext.Provider>
    </section>
  );
}

export default Application;
