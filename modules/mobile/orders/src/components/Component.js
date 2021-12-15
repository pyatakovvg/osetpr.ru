
import { selectOrders } from '@modules/mobile-orders';

import { Header } from "@ui.packages/mobile-kit";

import React from 'react';
import { useSelector } from 'react-redux';

import Order from './Order';

import styles from "./default.module.scss";


function Orders() {
  const orders = useSelector(selectOrders);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>История заказов</Header>
        </div>
        <div className={styles['content']}>
          {orders.map((order) => (
            <Order key={order['externalId']} {...order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
