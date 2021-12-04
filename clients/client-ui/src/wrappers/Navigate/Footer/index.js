
import React from 'react';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <p>Footer</p>
      </div>
    </div>
  );
}
