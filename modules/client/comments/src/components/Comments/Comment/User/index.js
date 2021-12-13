
import { Header } from '@ui.packages/client-kit'

import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function User({ name }) {
  const iconClassName = useMemo(() => cn(styles['icon'], 'far fa-address-card'), []);

  return (
    <div className={styles['wrapper']}>
      <span className={iconClassName} />
      <span className={styles['title']}>
        <Header level={3}>{ name }</Header>
      </span>
    </div>
  );
}

export default User;
