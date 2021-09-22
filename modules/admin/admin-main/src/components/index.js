
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';

import Component from './Component';


export default function HOC() {

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Доступные разделы`;
  });

  useUpdate(async function() {});

  useUnmount(function() {});

  return <Component />;
}
