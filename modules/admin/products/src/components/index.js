
import { resetStateAction, getItems } from '@modules/admin-products';

import { queryToObject } from '@ui.packages/utils';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();
  const location = useLocation();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товары`;

    const query = queryToObject(location['search']);
    await dispatch(getItems(query));
  });

  useUpdate(async function() {
    const query = queryToObject(location['search']);
    await dispatch(getItems(query));
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
