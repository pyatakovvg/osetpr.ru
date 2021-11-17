
import numeral from '@packages/numeral';

import { selectInProcess } from '@ui.packages/order';
import { Header, Button } from '@ui.packages/mobile-kit';
import { Confirm, openDialog, closeDialog } from '@ui.packages/mobile-dialog';
import { selectOrder, updateOrder, nextStepAction } from '@ui.packages/order';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';
import Attention from './Attention';

import styles from './default.module.scss';


function Basket() {
  const dispatch = useDispatch();

  const [productUuid, setProductUuid] = useState(null);

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
    setProductUuid(uuid);
    dispatch(openDialog('apply-remove'));
  }

  function handleRemoveAll() {
    dispatch(openDialog('apply-remove-all'));
  }

  async function handleRemoveApply() {
    let products = order['products'].filter((item) => item['uuid'] !== productUuid);
    setProductUuid(null);
    dispatch(closeDialog('apply-remove'));
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));

  }

  async function handleRemoveAllApply() {
    dispatch(closeDialog('apply-remove-all'));
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
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
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>Корзина</Header>
          {order && !! order['products'].length && (
            <span className={styles['clean']} onClick={() => handleRemoveAll()}>Очистить</span>
          )}
        </div>
        <div className={styles['content']}>
          {order && (order['total'] < 500) && (
            <div className={styles['attention']}>
              <Attention />
            </div>
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
          <Button
            inProcess={inProcess}
            onClick={() => handleNextStep()}
          >Оформить заказ на { numeral(order['total']).format() } { order['currency']['displayName'] }</Button>
        </div>
      )}

      <Confirm name={'apply-remove'} message={'Вы уверены, что хотите убрать товар из корзины?'} onApply={handleRemoveApply} />
      <Confirm name={'apply-remove-all'} message={'Вы уверены, что хотите очистить корзину?'} onApply={handleRemoveAllApply} />
    </div>
  );
}

export default Basket;
