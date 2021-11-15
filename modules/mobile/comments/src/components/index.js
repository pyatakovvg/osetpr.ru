
import { resetStateAction, getComments } from '@modules/mobile-comments';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Коментарии`;

    dispatch(getComments());
  });

  useUnmount(() => {
    dispatch(resetStateAction());
  });

  return <Component />;
}
