
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Item(item) {
  const location = useLocation();

  const levelPath = '/' + item['path'].replace(/^\/|\/$/, '').split('/')[0];
  const levelPathname = '/' + location['pathname'].replace(/^\/|\/$/, '').split('/')[0];

  const isMatch = levelPath === levelPathname;

  const itemClassName = cn(styles['item'], {
    [styles['item--active']]: isMatch,
  });

  return (
    <span className={itemClassName}>
      <Link to={item['path']} className={styles['link']}>
        {item['icon'] && <span className={cn(styles['icon'], item['icon'])} />}
        <span className={styles['text']}>{item['title']}</span>
      </Link>
    </span>
  );
}
