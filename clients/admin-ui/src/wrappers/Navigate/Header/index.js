
import { Logotype } from '@ui.packages/admin-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import Profile from './Profile';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['content']}>
        <Link className={styles['logotype']} to={process.env['PUBLIC_URL'] + '/'}>
          <Logotype />
        </Link>
      </div>
      <div className={styles['controls']}>
        <Profile />
      </div>
    </div>
  );
}
