
import React from 'react';
import { Link } from 'react-router-dom';

import Profile from './Profile';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-pizza-slice" />&nbsp;&nbsp;&nbsp;Осетинские пироги</Link>
        </div>
      </div>
      <div className={styles['controls']}>
        <Profile />
      </div>
    </div>
  );
}
