
import { resetStateAction, getOrder, updateOrderRequestSuccessAction } from '@modules/mobile-order';

import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const params = useParams();
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Заказ`;

    on(process.env['REACT_APP_SOCKET_ORDER_UPDATE'], (data) => {
      dispatch(updateOrderRequestSuccessAction(data));
    });

    await dispatch(getOrder(params['uuid'], window.localStorage.getItem('userUuid')));
  });

  useUnmount(() => {

    off(process.env['REACT_APP_SOCKET_ORDER_UPDATE']);

    dispatch(resetStateAction());
  });

  return <Component />;
}
