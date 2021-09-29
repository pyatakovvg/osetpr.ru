
import { resetStateAction, getItem } from '@modules/admin-order';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const params = useParams();
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - ` + params['uuid'] ? 'Оформление заказа' : 'Редактирование заказа';

    if (params['uuid']) {
      await dispatch(getItem(params['uuid']));
    }
  });

  useUpdate(async function() {});

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
