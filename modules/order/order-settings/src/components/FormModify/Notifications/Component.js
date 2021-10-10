
import { Text } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Customer() {
  return (
    <form className={styles['wrapper']}>
      <div className={styles['content']}>
        <Text>В разработке</Text>
      </div>
    </form>
  );
}

export default Customer;
