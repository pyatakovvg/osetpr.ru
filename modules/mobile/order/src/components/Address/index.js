
import numeral from '@packages/numeral';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, nextStepAction } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from './Form';

import styles from './default.module.scss';


function Address() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);

  function handleBack() {
    dispatch(nextStepAction(0));
  }

  function handleNextStep() {

  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Корзина</Header>
          <span className={styles['clean']} onClick={() => handleBack()}>Оформить заказ</span>
        </div>
        <div className={styles['products']}>
          <Form />
        </div>
      </div>
      {order && !! order['products'].length && (
        <div className={styles['control']}>
          <Button onClick={() => handleNextStep()}>Подтвердить заказ на {numeral(order['total']).format()} {order['currency']['value']}</Button>
        </div>
      )}
    </div>
  );
}

export default Address;
