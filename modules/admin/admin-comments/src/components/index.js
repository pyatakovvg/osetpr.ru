
import { resetStateAction, getItems, setProcessAction } from '@modules/admin-comments';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Комментарии`;

    dispatch(setProcessAction(true));
    await dispatch(getItems());
    dispatch(setProcessAction(false));
  });

  useUpdate(async function() {

    dispatch(setProcessAction(true));
    await dispatch(getItems());
    dispatch(setProcessAction(false));
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
