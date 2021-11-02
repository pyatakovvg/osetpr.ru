
import { selectProducts } from '@modules/mobile-main';

import { selectOrder, updateOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Main() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const products = useSelector(selectProducts);

  function handleToCart(product) {
    const orderProducts = order ? order['products'] : [];
    let products = [...orderProducts];
    const productIndex = products.findIndex((item) => item['modeUuid'] === product['modeUuid']);

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
        modeUuid: product['modeUuid'],
        value: product['value'],
        vendor: product['vendor'],
        gallery: product['gallery'],
        number: 1,
        currencyCode: product['currency']['code'],
      });
    }

    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order ? order['uuid'] : null,
      products,
    }));
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        {products.map((item) => (
          <Product key={item['uuid']} {...item} toCart={(data) => handleToCart(data)} />
        ))}
      </div>
    </section>
  );
}

export default Main;
