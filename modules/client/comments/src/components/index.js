
import { getComments } from '@modules/client-comments';

import { useMount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Комментарии`;

    dispatch(getComments());
  });

  return <Component />;
}
