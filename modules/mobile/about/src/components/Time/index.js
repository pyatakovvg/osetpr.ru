
import { Text } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function Delivery() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['row']}>
        <Text>Заказы принимаются с 08:00 до 22:00</Text>
      </div>
    </section>
  );
}

export default Delivery;
