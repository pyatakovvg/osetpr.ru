
import { Logotype } from '@ui.packages/client-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import Cart from './Cart';
import Navigate from './Navigation';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['header']}>
            <Link className={styles['logotype']} to={'/'}>
              <Logotype />
            </Link>
          </div>
          <menu className={styles['navigate']}>
            <Navigate />
          </menu>
        </div>
        <div className={styles['controls']}>
          <Cart />
        </div>
      </div>
    </div>
  );
}
