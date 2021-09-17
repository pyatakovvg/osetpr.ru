
import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getItems, getUnits } from '../ducks/commands';
import {
  resetStateAction,

  createItemRequestSuccessAction,
  updateItemRequestSuccessAction,
  deleteItemRequestSuccessAction,

  createUnitRequestSuccessAction,
  updateUnitRequestSuccessAction,
  deleteUnitRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Аттрибуты`;

    await dispatch(getItems());
    await dispatch(getUnits());

    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_CREATE'], (data) => dispatch(createItemRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_UPDATE'], (data) => dispatch(updateItemRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_DELETE'], (data) => dispatch(deleteItemRequestSuccessAction(data)));

    on(process.env['REACT_APP_SOCKET_UNIT_CREATE'], (data) => dispatch(createUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_UPDATE'], (data) => dispatch(updateUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_DELETE'], (data) => dispatch(deleteUnitRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getItems());
    await dispatch(getUnits());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_CREATE']);
    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_UPDATE']);
    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_DELETE']);

    off(process.env['REACT_APP_SOCKET_UNIT_CREATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_UPDATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_DELETE']);
  });

  return <Component />;
}
