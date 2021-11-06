
import numeral from '@packages/numeral';

import { selectInProcess } from '@ui.packages/order';
import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, updateOrder, nextStepAction } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Order() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const inProcess = useSelector(selectInProcess);

  function handleChange(product) {
    let products = [...order['products']];
    const productIndex = products.findIndex((item) => item['uuid'] === product['uuid']);

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

  function handleRemove(uuid) {
    let products = order['products'].filter((item) => item['uuid'] !== uuid);
    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));
  }

  function handleResetAll() {
    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products: [],
      address: null,
      paymentCode: null,
    }));
  }

  function handleNextStep() {
    dispatch(nextStepAction(1));
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
          <Button
            inProcess={inProcess}
            onClick={() => handleNextStep()}
          >Оформить заказ на { numeral(order['total']).format() } { order['currency']['displayName'] }</Button>
        </div>
      )}
    </div>
  );
}

export default Order;
