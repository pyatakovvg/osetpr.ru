
import { resetStateAction, checkPushSubscribe } from '@modules/mobile-options';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Настройка`;

    dispatch(checkPushSubscribe());
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
