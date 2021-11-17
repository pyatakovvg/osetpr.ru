
import { Text } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function Common() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['row']}>
        <Text>ИП "Максим Бибилов"</Text>
      </div>
      <div className={styles['row']}>
        <Text>Адрес: г. Симферополь, ул. Гавена 46</Text>
      </div>
      <div className={styles['row']}>
        <Text>Тел.: +7 (978) 590-60-60</Text>
      </div>
    </div>
  );
}

export default Common;
