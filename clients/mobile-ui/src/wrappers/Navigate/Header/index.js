
import { Logotype } from '@ui.packages/mobile-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['logotype']}>
        <Link to={process.env['PUBLIC_URL'] + '/'}>
          <Logotype />
        </Link>
      </div>
    </div>
  );
}
