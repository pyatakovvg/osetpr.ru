
import React from 'react';
import { Link, useMatch } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Item({ path, title }) {
  const isActive = useMatch(path);

  const itemClassName = cn(styles['item'], {
    [styles['item--active']]: isActive,
  });

  return (
    <span className={itemClassName}>
      <Link to={ path } className={styles['link']}>
        <span className={styles['text']}>{ title }</span>
      </Link>
    </span>
  );
}
