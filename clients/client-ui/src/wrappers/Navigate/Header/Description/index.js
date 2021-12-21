
import { Header, Text } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Description() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['col']}>
        <Header level={3}>Доставка еды по г.Симферополь</Header>
      </div>
      <div className={styles['col']}>
        <Text>время приема заказов с 8:00 до 22:00</Text>
      </div>
      <div className={styles['col']}>
        <a className={styles['phone']} href={'tel:+79785906060'}>тел: +7 (978) 590-60-60</a>
      </div>
    </div>
  );
}
