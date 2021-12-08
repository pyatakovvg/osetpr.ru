
import { getProducts, resetStateAction } from '@modules/client-main';

import { queryToObject } from '@ui.packages/utils';
import { useMount, useUpdate, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();
  const location = useLocation();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  });

  useUpdate(async function() {

    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  });

  useUnmount(function() {

    dispatch(resetStateAction());
  });

  return <Component />;
}
