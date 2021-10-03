
import { resetStateAction } from '@modules/order-sign-up';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Регистрация`;
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
