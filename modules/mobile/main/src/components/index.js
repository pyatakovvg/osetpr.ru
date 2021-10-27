
import { resetStateAction, getProducts } from '@modules/mobile-main';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    await dispatch(getProducts());
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
