
import { selectItem, updateCustomer } from '@modules/admin-customer';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';

import styles from './default.module.scss';


function FormModify() {
  const dispatch = useDispatch();

  const item = useSelector(selectItem);

  async function handleUpdate(data) {
    console.log(data)
    await dispatch(updateCustomer(data));
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
