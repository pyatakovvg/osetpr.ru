
import { selectPayments } from '@modules/client-order-draft';

import { Header, Button } from '@ui.packages/client-kit';
import { selectOrder, selectInProcess } from '@ui.packages/order';

import React from 'react';
import { useSelector } from 'react-redux';

import Empty from './Empty';
import Basket from './Basket';
import FormModify from './FormModify';

import styles from './default.module.scss';
import moment from "@packages/moment";
import numeral from "@packages/numeral";


function Order() {
  const order = useSelector(selectOrder);
  const payments = useSelector(selectPayments);
  const inProcess = useSelector(selectInProcess);

  function handleSubmit(data) {
    console.log(data);
  }

  if ( ! payments.length) {
    return null;
  }

  if ( ! order || ! order['products'].length) {
    return <Empty />;
  }

  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header>Ваш заказ</Header>
      </header>
      <article className={styles['content']}>
        <div className={styles['products']}>
          <Basket />
        </div>
        <div className={styles['details']}>
          <FormModify
            initialValues={{
              address: {
                city: 'Симферополь',
                ...order['address'],
              },
              payment: {
                code: order['payment'] ? order['payment']['code'] : payments[0]['code'],
              },
              dateTo: order['dateTo'] ? moment(order['dateTo']) : moment().add(2, 'hours'),
              customer: {
                ...order['customer'],
              },
              description: order['description'],
            }}
          />
        </div>
        <div className={styles['controls']}>
          <Button
            inProcess={inProcess}
            onClick={() => handleSubmit()}
          >Подтвердить заказ на { numeral(order['total']).format()} {order['currency']['displayName'] }</Button>
        </div>
      </article>
    </section>
  );
}

export default Order;
