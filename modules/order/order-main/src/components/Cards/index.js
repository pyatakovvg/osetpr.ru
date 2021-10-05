
import React from 'react';

import Card from './Card';

import styles from './default.module.scss';


function Cards() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['line']}>
        <Card icon={'fas fa-tag'} title={'Заказы'} href={'/orders'} />
      </div>
      <div className={styles['line']}>
        <Card icon={'fas fa-images'} title={'Настройки'} href={'/settings'} />
      </div>
    </div>
  );
}

export default Cards;
