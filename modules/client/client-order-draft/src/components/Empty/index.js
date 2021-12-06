
import { Header } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Empty() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Header>Нет выбранных товаров</Header>
      </div>
    </div>
  );
}
