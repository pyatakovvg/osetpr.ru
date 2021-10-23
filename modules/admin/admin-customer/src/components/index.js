
import { getItem, getPlans, resetStateAction } from '@modules/admin-customer';

import { useMount, useUnmount } from '@ui.packages/hoc';
import { createCancelToken } from '@ui.packages/request';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();
  const params = useParams();

  const getItemCancelToken = createCancelToken();
  const getPlansCancelToken = createCancelToken();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Редактирование клиента`;
    console.log(params)
    await dispatch(getItem(params['uuid'], {
      cancelToken: getItemCancelToken['token'],
    }));

    await dispatch(getPlans({
      cancelToken: getPlansCancelToken['token'],
    }));
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    getItemCancelToken.cancel();
    getPlansCancelToken.cancel();
  });

  return <Component />;
}
