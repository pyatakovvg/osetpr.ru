
import React from 'react';

import Item from './Item';

import styles from './default.module.scss';


export default function Navigation({ items }) {
  return (
    <nav className={styles['navigate']}>
      {items.map((item, index) => (
        <Item key={index} path={item['path']} title={item['title']} />
      ))}
    </nav>
  );
}
