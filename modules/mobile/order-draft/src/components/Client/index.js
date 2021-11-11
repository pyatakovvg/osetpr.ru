
import { selectPayments } from '@modules/mobile-order-draft';

import numeral from '@packages/numeral';
import moment from '@packages/moment';

import { pushNotification } from '@ui.packages/mobile-notifications';
import { selectInProcess, resetStateAction } from '@ui.packages/order';
import { Dialog, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import { Header, Button } from '@ui.packages/mobile-kit';
import { selectOrder, nextStepAction, updateOrder } from '@ui.packages/order';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Item from "./Item";
import Date from "./Date";
import Address from "./Address";
import Payment from "./Payment";
import Details from "./Details";
import Description from "./Description";

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
    customer = data['name'] + '; ' + data['phone'].replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/ig, '$1 ($2) $3-$4-$5');
  }
  return customer;
}


function Client() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector(selectOrder);
  const payments = useSelector(selectPayments);
  const inProcess = useSelector(selectInProcess);

  function handleBack() {
    dispatch(nextStepAction(0));
  }

  async function handleAddressUpdate(address) {
    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      address,
    }));

    if (isUpdated) {
      dispatch(closeDialog('address'));
    }
  }

  async function handlePaymentUpdate(data) {
    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      payment: { code: data['code'] },
    }));

    if (isUpdated) {
      dispatch(closeDialog('payment'));
    }
  }

  async function handleDateToUpdate(data) {
    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      dateTo: data['dateTo'],
    }));

    if (isUpdated) {
      dispatch(closeDialog('date'));
    }
  }

  async function handleDetailsUpdate(data) {
    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      customer: { name: data['name'], phone: data['phone'] },
    }));

    if (isUpdated) {
      dispatch(closeDialog('details'));
    }
  }

  async function handleDescriptionUpdate(data) {
    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      description: data['description'],
    }));

    if (isUpdated) {
      dispatch(closeDialog('description'));
    }
  }

  async function handleSubmit() {
    const isAddress = !! order['address'];
    const isPayment = !! order['payment'];
    const isCustomer = !! order['customer'];

    if ( ! isAddress) {
      return dispatch(pushNotification({
        title: 'Вы не указали адрес доставки',
        mode: 'danger',
      }));
    }

    if ( ! isPayment) {
      return dispatch(pushNotification({
        title: 'Вы не указали способ оплаты',
        mode: 'danger',
      }));
    }

    if ( ! isCustomer) {
      return dispatch(pushNotification({
        title: 'Вы не указали контактные данные',
        mode: 'danger',
      }));
    }

    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      ...order,
      statusCode: 'new',
    }));

    if (isUpdated) {
      await dispatch(resetStateAction());
      navigate(process.env['PUBLIC_URL'] + '/order/' + order['uuid']);
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Корзина</Header>
          <span className={styles['clean']} onClick={() => handleBack()}>{'<'} Оформиление заказа</span>
        </div>
        <div className={styles['products']}>
          <div className={styles['row']}>
            <Item title={'Адрес доставки'} value={addressToString(order['address'])} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('address'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Способ оплаты'} value={order['payment'] && order['payment']['displayName']} defaultValue={'Не указан'} onClick={() => dispatch(openDialog('payment'))}/>
          </div>
          <div className={styles['row']}>
            <Item title={'Доставка ко времени'} value={order['dateTo'] ? moment(order['dateTo']).format('DD.MM.YYYY HH:mm') : null} defaultValue={'Как можно скорее'} onClick={() => dispatch(openDialog('date'))}/>
          </div>
          <div className={styles['row']}>
            <Item
              title={'Ваши данные'}
              value={customerData(order['customer'])}
              defaultValue={'Не указан'}
              onClick={() => dispatch(openDialog('details'))}
            />
          </div>
          <div className={styles['row']}>
            <Item title={'Информация к заказу (не обязательно)'} value={null} defaultValue={order['description'] || 'Не указано'} onClick={() => dispatch(openDialog('description'))}/>
          </div>
        </div>
      </div>
      <div className={styles['control']}>
        <Button
          inProcess={inProcess}
          onClick={() => handleSubmit()}
        >Подтвердить заказ на { numeral(order['total']).format()} {order['currency']['displayName'] }</Button>
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

      <Dialog name={'date'}>
        <Date
          initialValues={{
            dateTo: order['dateTo'] ? moment(order['dateTo']) : moment().add(2, 'hours'),
          }}
          onSubmit={(data) => handleDateToUpdate(data) }
        />
      </Dialog>

      <Dialog name={'details'}>
        <Details
          initialValues={{
            ...order['customer'],
          }}
          onSubmit={(data) => handleDetailsUpdate(data)}
        />
      </Dialog>

      <Dialog name={'description'}>
        <Description
          initialValues={{
            description: order['description'],
          }}
          onSubmit={(data) => handleDescriptionUpdate(data)}
        />
      </Dialog>
    </div>
  );
}

export default Client;
