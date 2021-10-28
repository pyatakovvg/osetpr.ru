
import { selectProducts } from '@modules/mobile-main';

import { addProductAction } from '@ui.packages/order';
import { Product } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Main() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  function handleToCart(product) {
    dispatch(addProductAction(product));
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        {products.map((item) => (
          <Product key={item['uuid']} {...item} toCart={(uuid) => handleToCart(uuid)} />
        ))}
      </div>
    </section>
  );
}

export default Main;
