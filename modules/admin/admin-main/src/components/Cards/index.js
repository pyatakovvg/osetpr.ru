
import React from 'react';

import Card from './Card';

import styles from './default.module.scss';


function Cards() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['line']}>
        <Card icon={'fas fa-tag'} title={'Заказы'} href={'/orders'} />
        <Card icon={'fas fa-shopping-cart'} title={'Товары'} href={'/products'} />
        <Card icon={'far fa-comments'} title={'Комментарии'} href={'/comments'} />
      </div>
      <div className={styles['line']}>
        <Card icon={'far fa-images'} title={'Галлерея'} href={'/gallery'} />
        <Card icon={'fas fa-percentage'} title={'Фин. план'} href={'/plans'} />
        <Card icon={'fas fa-users'} title={'Пользователи'} href={'/customers'} />
      </div>
      <div className={styles['line']}>
        <Card icon={'fas fa-cog'} title={'Настройки'} href={'/settings/main'} />
      </div>
    </div>
  );
}

export default Cards;
