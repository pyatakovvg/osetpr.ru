
import { resetStateAction, getOrders, updateOrderRequestSuccessAction } from '@modules/mobile-orders';

import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - История заказов`;

    on(process.env['REACT_APP_SOCKET_ORDER_UPDATE'], (data) => {
      dispatch(updateOrderRequestSuccessAction(data));
    });

    await dispatch(getOrders(window.localStorage.getItem('userUuid')));
  });

  useUnmount(() => {

    off(process.env['REACT_APP_SOCKET_ORDER_UPDATE']);

    dispatch(resetStateAction());
  });

  return <Component />;
}
