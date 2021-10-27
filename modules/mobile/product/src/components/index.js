
import { resetStateAction, getProduct } from '@modules/mobile-product';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Продукт`;

    await dispatch(getProduct(uuid));
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
