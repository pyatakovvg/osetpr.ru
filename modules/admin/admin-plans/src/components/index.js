
import { resetStateAction, getItems } from '@modules/admin-plans';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Планы`;

    await dispatch(getItems());
  });

  useUpdate(async function() {

    await dispatch(getItems());
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
