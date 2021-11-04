
import React from 'react';

import styles from './default.module.scss';


export default function NotSrc() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <span className={styles['dot-1']}/>
        <span className={styles['dot-2']}/>
        <span className={styles['dot-3']}/>
      </div>
    </div>
  );
}
