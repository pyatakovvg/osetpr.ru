
import { Cart } from '@ui.packages/mobile-kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


export default function CartButton() {
  const navigate = useNavigate();

  function handleOrder() {
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['cart']}>
        <Cart onClick={() => handleOrder()} />
      </div>
      <span className={styles['background']} />
    </div>
  );
}
