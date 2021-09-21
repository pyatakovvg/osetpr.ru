
import { selectProfile } from '@ui.packages/application';
import { selectItem, createItem, updateItem } from '@modules/order-order-modify';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';

import styles from './default.module.scss';


function FormModify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = useSelector(selectItem);
  const profile = useSelector(selectProfile);

  async function handleUpdate(data) {
    if (data['uuid']) {
      const isUpdated = await dispatch(updateItem(data));
      if (isUpdated) {
        navigate(process.env['PUBLIC_URL'] + '/orders');
      }
    }
    else {
      const isCreated = await dispatch(createItem(data));
      if (isCreated) {
        navigate(process.env['PUBLIC_URL'] + '/orders');
      }
    }
  }

  return (
    <div className={styles['wrapper']}>
      <Form
        initialValues={{
          address: profile['customer'][profile['customer']['type']]['address'],
          ...item,
        }}
        onSubmit={(data) => handleUpdate(data)}
      />
    </div>
  );
}

export default FormModify;
