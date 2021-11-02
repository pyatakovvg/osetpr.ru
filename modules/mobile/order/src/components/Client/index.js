
import numeral from '@packages/numeral';
import { Dialog, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, nextStepAction, updateOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from "./Item";
import Address from "./Address";
import Payment from "./Payment";

import styles from './default.module.scss';


function addressToString(data) {
  let address = '';
  if (data && data instanceof Object) {
    if (data['city']) {
      address += data['city'];
    }
    if (data['street']) {
      address += ', ' + data['street'];
    }
    if (data['house']) {
      address += ', ' + data['house'];
    }
    if (data['building']) {
      address += ', ' + data['building'];
    }
    if (data['apartment']) {
      address += ', ' + data['apartment'];
    }
    if (data['front']) {
      address += ', ' + data['front'];
    }
  }
  return address;
}


function Client() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);

  function handleBack() {
    dispatch(nextStepAction(0));
  }

  function handleAddressUpdate(data) {
    console.log(data)
    dispatch(closeDialog('address'));
    dispatch(updateOrder(order['uuid'], {
      ...order,
      address: data,
    }));
  }

  function handlePaymentUpdate() {
    dispatch(closeDialog('payment'));
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
            <Item title={'Адрес доставки'} value={addressToString(order['address'])} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('address'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Способ оплаты'} value={order['paymentCode']} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('payment'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Доставка ко времени'} value={null} defaultValue={'Как можно скорее'} onClick={() => console.log(4676)}/>
          </div>
        </div>
      </div>
      <div className={styles['control']}>
        <Button>Подтвердить заказ на { numeral(order['total']).format()} {order['currency']['value'] }</Button>
      </div>

      <Dialog name={'address'}>
        <Address
          initialValues={{
            city: 'Симферополь',
            ...order['address'],
          }}
          onSubmit={(data) => handleAddressUpdate(data) }
        />
      </Dialog>

      <Dialog name={'payment'}>
        <Payment
          initialValues={{
            payment: 'cash-to-courier'
          }}
          onSubmit={(data) => handlePaymentUpdate(data) }
        />
      </Dialog>
    </div>
  );
}

export default Client;
