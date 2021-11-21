
import { Text } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function Delivery() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['row']}>
        <Text type={Text.type.bold}>Бесплатная доставка осуществляется:</Text>
      </div>
      <div className={styles['row']}>
        <Text>Центральные районы - от 500 руб.</Text>
        <Text>Пригород - от 700 руб.</Text>
      </div>
      <div className={styles['row']}>
        <Text type={Text.type.bold}>При меньшей сумме цена за доставку составит:</Text>
      </div>
      <div className={styles['row']}>
        <Text>Центральные районы - 150 руб.</Text>
        <Text>Пригород - 250 руб.</Text>
      </div>
    </section>
  );
}

export default Delivery;
