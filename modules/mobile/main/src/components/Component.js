
import { selectProducts } from '@modules/mobile-main';

import { Product } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function Main() {
  const products = useSelector(selectProducts);

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        {products.map((item) => (
          <Product key={item['uuid']} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Main;
