
import { useMount, useUpdate, useUnmount } from '@ui.packages/hoc';

import React from 'react';

import Component from './Component';


export default function HOC() {
  useMount(function() {});
  useUpdate(function() {});
  useUnmount(function() {});

  return <Component />;
}
