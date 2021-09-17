
import { Spinner } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


export default function() {
  return (
    <div className={styles['wrapper']}>
      <Spinner />
    </div>
  );
}
