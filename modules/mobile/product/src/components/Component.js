
import { selectProduct } from '@modules/mobile-product';

import { selectOrder, updateOrder } from '@ui.packages/order';
import { Image, Header, Cart } from '@ui.packages/mobile-kit';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function Product() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const product = useSelector(selectProduct);

  const [mode, setMode] = useState(null);

  function handleToCart(product) {
    const orderProducts = order ? order['products'] : [];
    let products = [...orderProducts];
    const productIndex = products.findIndex((item) => item['vendor'] === product['vendor']);

    if (productIndex > -1) {
      products = [
        ...products.slice(0, productIndex),
        {
          ...products[productIndex],
          number: products[productIndex]['number'] + 1,
        },
        ...products.slice(productIndex + 1),
      ];
    }
    else {
      products.push({
        price: product['price'],
        title: product['title'],
        productUuid: product['productUuid'],
        value: product['value'],
        vendor: product['vendor'],
        number: 1,
        currencyCode: product['currency']['code'],
      });
    }

    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order ? order['uuid'] : null,
      products,
    }));
  }

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
          {product['modes'].map((item) => {
            const product = order ? order['products'].find((product) => item['vendor'] === product['vendor']) : null;
            return (
              <Mode
                key={item['uuid']}
                count={product ? product['number'] : null}
                isActive={item['uuid'] === mode['uuid']}
                value={item['value']} price={item['price']} currency={item['currency']}
                onClick={() => handleClick(item)}
              />
            )
          })}
          <div className={styles['cart']}>
            <Cart mode={Cart.mode.success} onClick={() => handleToCart({ productUuid: product['uuid'], title: product['title'], ...mode })} />
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
