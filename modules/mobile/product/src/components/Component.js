
import { selectProduct } from '@modules/mobile-product';

import { Image } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function Product() {
  const product = useSelector(selectProduct);

  if ( ! product) {
    return null;
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['gallery']}>
          <Image src={'http://localhost:4000/gallery/' + product['gallery'][0]['uuid']} />
        </div>
        <div className={styles['title']}>
          <p>{ product['title'] }</p>
        </div>
        <div className={styles['modes']}>
          {product['modes'].map((mode) => (
            <p key={mode['uuid']}>{ mode['value'] } { mode['price'] } { mode['currency'] }</p>
          ))}
        </div>
        <div className={styles['description']}>
          <div dangerouslySetInnerHTML={{ __html: product['description'] }} />
        </div>
      </div>
    </section>
  );
}

export default Product;
