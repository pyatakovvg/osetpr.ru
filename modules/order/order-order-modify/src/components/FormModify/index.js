
import React from 'react';

import Form from './Form';

import styles from './default.module.scss';


function FormModify() {
  function handleUpdate() {

  }

  return (
    <div className={styles['wrapper']}>
      <Form onSubmit={(data) => handleUpdate(data)} />
    </div>
  );
}

export default FormModify;
