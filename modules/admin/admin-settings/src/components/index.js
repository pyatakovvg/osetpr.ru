
import { resetStateAction, setProcessAction, checkPushSubscribe } from '@modules/admin-settings';

import { selectProfile } from '@ui.packages/application';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Настройка`;

    dispatch(setProcessAction(true));
    await dispatch(checkPushSubscribe(profile['uuid']));
    dispatch(setProcessAction(false));
  });

  useUpdate(async function() {});

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
