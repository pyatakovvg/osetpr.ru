
import { InputField, Button } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Customer() {
  return (
    <form className={styles['wrapper']}>
      <div className={styles['content']}>
        <InputField
          require
          name="name"
          label="Новый пароль"
        />
      </div>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
        >Сменить</Button>
      </div>
    </form>
  );
}

export default Customer;
