
import React from 'react';

import Content from './Content';
import Description from './Description';
import Controls from './Controls';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['col']}>
            <Content />
          </div>
          <div className={styles['col']}>
            <Description />
          </div>
        </div>
        <div className={styles['controls']}>
          <Controls />
        </div>
      </div>
    </div>
  );
}
