
import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getGallery } from '../ducks/commands';
import {
  resetStateAction,

  createGalleryRequestSuccessAction,
  updateGalleryRequestSuccessAction,
  deleteGalleryRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Галерея`;

    await dispatch(getGallery());

    on(process.env['REACT_APP_SOCKET_IMAGE_CREATE'], (data) => dispatch(createGalleryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_IMAGE_UPDATE'], (data) => dispatch(updateGalleryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_IMAGE_DELETE'], (data) => dispatch(deleteGalleryRequestSuccessAction({ uuid: data })));
  });

  useUpdate(async function() {
    await dispatch(getGallery());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_TYPE_CREATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_UPDATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_DELETE']);
  });

  return <Component />;
}
