
import React from 'react';

import Card from './Card';

import styles from './default.module.scss';


function Cards() {
  return (
    <div className={styles['wrapper']}>
      <Card icon={'fas fa-file-invoice-dollar'} title={'Заказы'} href={'/orders'} />
      <Card icon={'fas fa-user-cog'} title={'Настройки'} href={'/settings'} />
    </div>
  );
}

Cards.propTypes = {};

Cards.defaultProps = {};

export default Cards;
