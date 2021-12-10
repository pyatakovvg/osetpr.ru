
import { resetStateAction, getItems, setProcessAction, updateItemAction } from '@modules/admin-orders';

import { on, off } from '@ui.packages/socket';
import { pushNotification } from '@ui.packages/admin-notifications';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Заказы`;

    dispatch(setProcessAction(true));
    await dispatch(getItems());
    dispatch(setProcessAction(false));
  });

  useMount(() => {

    on(process.env['REACT_APP_SOCKET_ORDER_CREATE'], () => {
      dispatch(pushNotification({
        title: 'Новый заказ',
        mode: 'primary',
      }));
    });
    on(process.env['REACT_APP_SOCKET_ORDER_UPDATE'], (data) => dispatch(updateItemAction(data)));
  });

  useUpdate(async function() {

    dispatch(setProcessAction(true));
    await dispatch(getItems());
    dispatch(setProcessAction(false));
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_ORDER_CREATE']);
    off(process.env['REACT_APP_SOCKET_ORDER_UPDATE']);
  });

  return <Component />;
}