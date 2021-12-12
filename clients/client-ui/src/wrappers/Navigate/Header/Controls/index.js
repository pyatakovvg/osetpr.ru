
import React from 'react';

import Cart from './Cart';
import Profile from './Profile';

import styles from './default.module.scss';


function Controls() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['col']}>
        <Profile />
      </div>
      <div className={styles['col']}>
        <Cart />
      </div>
    </div>
  );
}

export default Controls;
