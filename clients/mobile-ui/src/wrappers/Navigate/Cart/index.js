
import { selectProducts } from '@ui.packages/order';

import { Cart } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


function useCountOrderProducts() {
  let count = 0;
  const productsInOrder = useSelector(selectProducts);
  for (let i in productsInOrder) {
    if (productsInOrder.hasOwnProperty(i)) {
      const product = productsInOrder[i];
      for (let k in product[1]) {
        if (product[1].hasOwnProperty(k)) {
          const mode = product[1][k];
          count += mode[1];
        }
      }
    }
  }
  return count;
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
