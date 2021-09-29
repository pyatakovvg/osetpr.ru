
import { resetStateAction, setProcessAction, getItems } from '@modules/order-orders';

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

  useUpdate(async function() {
    await dispatch(getItems());
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
