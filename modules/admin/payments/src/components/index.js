
import { getPayments, resetStateAction } from '@modules/admin-payments';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Способы оплаты`;

    await dispatch(getPayments());
  });

  useUpdate(async function() {});

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
