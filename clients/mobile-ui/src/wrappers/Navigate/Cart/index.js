
import { Cart } from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


export default function CartButton() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['cart']}>
        <Cart />
      </div>
      <span className={styles['background']} />
    </div>
  );
}
