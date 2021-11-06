
import { resetStateAction, getOrder } from '@modules/mobile-order';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const params = useParams();
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Заказ`;

    await dispatch(getOrder(params['uuid'], window.localStorage.getItem('userUuid')));
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
