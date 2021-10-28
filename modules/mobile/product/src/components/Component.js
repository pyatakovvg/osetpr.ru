
import { selectProduct } from '@modules/mobile-product';

import { Image, Header, Cart } from '@ui.packages/mobile-kit';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function Product() {
  const product = useSelector(selectProduct);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (product) {
      setMode(product['modes'].find((item) => item['isTarget']));
    }
  }, [product]);

  function handleClick(mode) {
    setMode(mode);
  }

  if ( ! product || ! mode) {
    return null;
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['gallery']}>
          <Image src={product['gallery'][0] ? process.env['PUBLIC_URL'] + '/gallery/' + product['gallery'][0]['uuid'] : null} />
        </div>
        <div className={styles['title']}>
          <Header>{ product['title'] }</Header>
        </div>
        <div className={styles['modes']}>
          {product['modes'].map((item) => (
            <Mode
              key={item['uuid']}
              isActive={item['uuid'] === mode['uuid']}
              value={item['value']} price={item['price']} currency={item['currency']}
              onClick={() => handleClick(item)}
            />
          ))}
          <div className={styles['cart']}>
            <Cart mode={Cart.mode.success} />
          </div>
        </div>
        <div className={styles['description']}>
          <div dangerouslySetInnerHTML={{ __html: product['description'] }} />
        </div>
      </div>
    </section>
  );
}

export default Product;
