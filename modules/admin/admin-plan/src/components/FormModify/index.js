
import { selectItem, updateItem, createItem } from '@modules/admin-plan';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';

import styles from './default.module.scss';


function FormModify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = useSelector(selectItem);

  async function handleUpdate(data) {
    if (data['uuid']) {
      await dispatch(updateItem(data));
    }
    else {
      const plan = await dispatch(createItem(data));
      if (plan) {
        navigate(process.env['PUBLIC_URL'] + '/plans/' + plan['uuid']);
      }
    }
  }

  return (
    <div className={styles['wrapper']}>
      <Form
        initialValues={{
          ...item,
        }}
        onSubmit={(data) => handleUpdate(data)}
      />
    </div>
  );
}

export default FormModify;
