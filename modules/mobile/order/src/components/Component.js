
import { selectOrder } from '@modules/mobile-order';

import numeral from "@packages/numeral";
import { Header, Text } from "@ui.packages/mobile-kit";

import React from 'react';
import { useSelector } from 'react-redux';

import Product from './Product';

import styles from "./default.module.scss";


function addressToString(data) {
  let address = '';
  if (data && data instanceof Object) {
    if (data['city']) {
      address += 'г.' + data['city'];
    }
    if (data['street']) {
      address += ', ул.' + data['street'];
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

function Order() {
  const order = useSelector(selectOrder);

  if ( ! order) {
    return null;
  }

  const address = addressToString(order['address']);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Ваш заказ</Header>
        </div>
        <div className={styles['products']}>
          <div className={styles['number']}>
            <Text>Номер: { order['externalId'] }</Text>
          </div>
          <div className={styles['status']}>
            <Text>Статус: { order['status'] }</Text>
          </div>
          <div className={styles['address']}>
            <Text>По адресу { address }</Text>
          </div>
          <div className={styles['payment']}>
            <Text>Способ оплаты "{ order['payment']['displayName'] }"</Text>
          </div>
          <div className={styles['amount']}>
            <Text>На сумму { numeral(order['total']).format() } { order['currency']['displayName'] }</Text>
          </div>
          <div className={styles['products']}>
            {order['products'].map((product) => (
              <Product key={product['uuid']} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
