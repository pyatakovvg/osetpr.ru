
import numeral from '@packages/numeral';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, updateOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Order() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);

  function handleChange(product) {
    let products = [...order['products']];
    const productIndex = products.findIndex((item) => item['vendor'] === product['vendor']);

    if (productIndex > -1) {
      products = [
        ...products.slice(0, productIndex),
        {
          ...products[productIndex],
          ...product,
        },
        ...products.slice(productIndex + 1),
      ];
    }

    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));
  }

  function handleRemove(vendor) {
    let products = order['products'].filter((item) => item['vendor'] !== vendor);
    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));
  }

  function handleResetAll() {
    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products: [],
    }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Корзина</Header>
          {order && !! order['products'].length && (
            <span className={styles['clean']} onClick={() => handleResetAll()}>Очистить</span>
          )}
        </div>
        <div className={styles['products']}>
          {( ! order || ! order['products'].length) && (
            <p>В корзине пока ничего нет
              Начните с главной страницы или воспользуйтесь поиском, чтобы найти что-то конкретное</p>
          )}
          {order && order['products'].map((product) => (
            <Product
              key={product['vendor']}
              type={'order'}
              {...product}
              onChange={(data) => handleChange(data)}
              onRemove={(vendor) => handleRemove(vendor)}
            />
          ))}
        </div>
      </div>
      {order && !! order['products'].length && (
        <div className={styles['control']}>
          <Button>Оформить заказ на {numeral(order['total']).format()} {order['currency']['value']}</Button>
        </div>
      )}
    </div>
  );
}

export default Order;
