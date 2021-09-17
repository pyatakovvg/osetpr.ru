
import React from 'react';

import styles from './default.module.scss';


export default function Controls({ children }) {
  return (
    <aside className={styles['wrapper']}>
      { children }
    </aside>
  );
}
