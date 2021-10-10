
import { resetStateAction, getItem } from '@modules/admin-plan';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  const params = useParams();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - План`;

    if (params['uuid']) {
      await dispatch(getItem(params['uuid']));
    }
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
