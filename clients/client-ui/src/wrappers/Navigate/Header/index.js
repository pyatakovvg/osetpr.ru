
import { Logotype } from '@ui.packages/client-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <Link className={styles['logotype']} to={'/'}>
          <Logotype />
        </Link>
      </div>
    </div>
  );
}
