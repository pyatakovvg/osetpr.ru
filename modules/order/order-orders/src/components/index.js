
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getItems } from '../ducks/commands';
import {
  resetStateAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Заказы`;

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
