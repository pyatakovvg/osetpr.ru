
import { resetStateAction, setProcessAction } from '@modules/admin-product';
import { getCurrencies, getGroups, getCategories, getProductById } from '@modules/admin-product';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const params = useParams();
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Редактирование товара`;

    dispatch(setProcessAction(true));

    await dispatch(getGroups());
    await dispatch(getCategories());
    await dispatch(getCurrencies());

    if (params['uuid']) {
      await dispatch(getProductById(params['uuid']));
    }

    dispatch(setProcessAction(false));
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
