
import { getItem, createItem, selectItem, selectInProcess } from '@modules/admin-comments';

import { useMount } from '@ui.packages/hoc';
import { Spinner } from '@ui.packages/admin-kit';
import { closeDialog } from '@ui.packages/dialog';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Component from './Form';

import styles from './default.module.scss';


export default function HOC({ data }) {
  const dispatch = useDispatch();

  const comment = useSelector(selectItem);
  const inProcess = useSelector(selectInProcess);

  useMount(async function() {
    dispatch(getItem(data['uuid']));
  });

  async function handleCreate(data) {
    const isSuccess = await dispatch(createItem(data));
    if (isSuccess) {
      dispatch(closeDialog('comment-modify'));
    }
  }

  if (inProcess) {
    return (
      <div className={styles['wrapper']}>
        <Spinner />
      </div>
    );
  }

  return (
    <Component
      initialValues={{
        parentUuid: comment ? comment['uuid'] : null,
      }}
      onSubmit={(data) => handleCreate(data)}
    />
  );
}
