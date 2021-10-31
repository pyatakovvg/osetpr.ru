
import React from 'react';

import Item from './Item';

import styles from './default.module.scss';


export default function Navigate({ items }) {
  return (
    <div className={styles['wrapper']}>
      {items.map((item, index) => (
        <Item key={index} path={item['path']} title={item['title']} />
      ))}
    </div>
  );
}
