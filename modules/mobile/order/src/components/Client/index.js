
import { selectPayments } from '@modules/mobile-order';

import numeral from '@packages/numeral';
import { Dialog, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, nextStepAction, updateOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from "./Item";
import Address from "./Address";
import Payment from "./Payment";
import Details from "./Details";

import styles from './default.module.scss';


function addressToString(data) {
  let address = '';
  if (data && data instanceof Object) {
    if (data['street']) {
      address += 'ул.' + data['street'];
    }
    if (data['house']) {
      address += ', д.' + data['house'];
    }
    if (data['building']) {
      address += ', к.' + data['building'];
    }
    if (data['front']) {
      address += ', п.' + data['front'];
    }
    if (data['apartment']) {
      address += ', кв.' + data['apartment'];
    }
    if (data['floor']) {
      address += ', эт.' + data['floor'];
    }
  }
  return address;
}

function customerData(data) {
  let customer = null;
  if (data && data instanceof Object) {
    customer = data['name'] + ' (' + data['phone'] + ')';
  }
  return customer;
}

function Client() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const payments = useSelector(selectPayments);

  function handleBack() {
    dispatch(nextStepAction(0));
  }

  async function handleAddressUpdate(address) {
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      address,
    }));
    dispatch(closeDialog('address'));
  }

  async function handlePaymentUpdate(data) {
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      payment: { code: data['code'] },
    }));
    dispatch(closeDialog('payment'));
  }

  async function handleDetailsUpdate(data) {
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      customer: { name: data['name'], phone: data['phone'] },
      description: data['description'],
    }));
    dispatch(closeDialog('details'));
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
            <Item title={'Способ оплаты'} value={order['payment'] && order['payment']['displayName']} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('payment'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Доставка ко времени'} value={null} defaultValue={'Как можно скорее'} onClick={() => console.log(4676)}/>
          </div>
          <div className={styles['row']}>
            <Item
              title={'Ваши данные'}
              value={customerData(order['customer'])}
              defaultValue={'Не указан'}
              onClick={() => dispatch(openDialog('details'))}
            />
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
            code: order['payment'] ? order['payment']['code'] : payments[0]['code'],
          }}
          onSubmit={(data) => handlePaymentUpdate(data) }
        />
      </Dialog>

      <Dialog name={'details'}>
        <Details
          initialValues={{
            ...order['customer'],
            description: order['description'],
          }}
          onSubmit={(data) => handleDetailsUpdate(data)}
        />
      </Dialog>
    </div>
  );
}

export default Client;
