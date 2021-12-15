
import { Header } from '@ui.packages/client-kit'

import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Admin() {
  const iconClassName = useMemo(() => cn(styles['icon']), []);

  return (
    <div className={styles['wrapper']}>
      <span className={iconClassName} />
      <span className={styles['title']}>
        <Header level={3}>osetpr.ru</Header>
      </span>
    </div>
  );
}

export default Admin;
