
import { getItem, selectItem, selectInFormProcess, resetItemAction, createItem, updateItem } from '@modules/order-main';

import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';
import Spinner from './Spinner';


export default function({ data }) {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);
  const inFormProcess = useSelector(selectInFormProcess);

  useMount(async () => {
    if (data && data['id']) {
      await dispatch(getItem(data['id']));
    }
  });

  useUnmount(() => {
    dispatch(resetItemAction());
  });

  function submitModify(data) {
    if ('id' in data) {
      dispatch(updateItem(data));
    }
    else {
      dispatch(createItem(data));
    }
  }

  return inFormProcess
    ? <Spinner />
    : (
      <Form
        initialValues={item}
        onSubmit={(data) => submitModify(data)}
      />
    );
}
