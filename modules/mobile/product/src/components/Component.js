
import { selectProduct } from '@modules/mobile-product';

import { selectOrder } from '@ui.packages/order';
import { Image, Header, Cart } from '@ui.packages/mobile-kit';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function useGetProduct(uuid) {
  const order = useSelector(selectOrder);
  return order ? order['products'].find((item) => item['uuid'] === uuid) : null;
}


function Product() {
  const product = useSelector(selectProduct);
  const orderProduct = useGetProduct(product ? product['uuid'] : null);

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

  function handleCart(product) {

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
          {product['modes'].map((item) => {
            const count = orderProduct && (orderProduct['vendor'] === item['vendor']) ? orderProduct['number'] : null;
            return (
              <Mode
                key={item['uuid']}
                count={count}
                isActive={item['uuid'] === mode['uuid']}
                value={item['value']} price={item['price']} currency={item['currency']}
                onClick={() => handleClick(item)}
              />
            )
          })}
          <div className={styles['cart']}>
            <Cart mode={Cart.mode.success} onClick={() => handleCart({ uuid: product['uuid'], modeUuid: mode['uuid'] })} />
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
