
import { Logotype } from '@ui.packages/client-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import Navigate from './Navigation';

import styles from './default.module.scss';


function Content() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['col']}>
        <Link className={styles['logotype']} to={'/'}>
          <Logotype />
        </Link>
      </div>
      <menu className={styles['col']}>
        <Navigate />
      </menu>
    </div>
  );
}

export default Content;
