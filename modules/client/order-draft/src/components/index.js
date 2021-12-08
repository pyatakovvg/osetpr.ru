
import { resetStateAction, getPayments } from '@modules/client-order-draft';

import { nextStepAction } from '@ui.packages/order';
import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;

    await dispatch(getPayments());
  });

  useUnmount(() => {
    dispatch(nextStepAction(0));
    dispatch(resetStateAction());
  });

  return <Component />;
}
