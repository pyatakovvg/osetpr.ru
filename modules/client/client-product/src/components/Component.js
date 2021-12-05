
import { selectProduct } from '@modules/client-product';

import React from 'react';
import { useSelector } from 'react-redux';

import ProductInfo from './Product';

import styles from './default.module.scss';


function Product() {
  const product = useSelector(selectProduct);

  if ( ! product) {
    return null;
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['product']}>
        <ProductInfo />
      </div>
      <div className={styles['description']}>
        <div dangerouslySetInnerHTML={{ __html: product['description'] }} />
      </div>
    </section>
  );
}

export default Product;
