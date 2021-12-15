
import React from 'react';

import styles from './default.module.scss';


export default function Loading() {
  return (
    <div className={styles['wrapper']}>
      <p className={styles['message']}>Loading</p>
    </div>
  );
}
