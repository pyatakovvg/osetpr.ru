
import numeral from '@packages/numeral';
import { Dialog, openDialog } from '@ui.packages/mobile-dialog';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, nextStepAction } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from "./Item";
import Form from "./Form";

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
          <span className={styles['clean']} onClick={() => handleBack()}>Оформиление заказа</span>
        </div>
        <div className={styles['products']}>
          <div className={styles['row']}>
            <Item title={'Адрес доставки'} value={null} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('address'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Способ оплаты'} value={null} defaultValue={'Не указан'} onClick={() => console.log(4676)}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Доставка ко времени'} value={null} defaultValue={'Как можно скорее'} onClick={() => console.log(4676)}/>
          </div>
        </div>
      </div>
      {order && !! order['products'].length && (
        <div className={styles['control']}>
          <Button onClick={() => handleNextStep()}>Подтвердить заказ на {numeral(order['total']).format()} {order['currency']['value']}</Button>
        </div>
      )}

      <Dialog name={'address'}>
        <Form onSubmit={(data) => console.log(data) }/>
      </Dialog>
    </div>
  );
}

export default Address;
