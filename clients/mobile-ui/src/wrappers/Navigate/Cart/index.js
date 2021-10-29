
import { selectOrder } from '@ui.packages/order';

import { Cart } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


function useCountOrderProducts() {
  const order = useSelector(selectOrder);
  return order ? order['products'].reduce((acc, cur) => acc + cur['number'], 0) : 0;
}

export default function CartButton() {
  const navigate = useNavigate();
  const count = useCountOrderProducts();

  function handleOrder() {
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['cart']}>
        <Cart count={count} onClick={() => handleOrder()} />
      </div>
      <span className={styles['background']} />
    </div>
  );
}
