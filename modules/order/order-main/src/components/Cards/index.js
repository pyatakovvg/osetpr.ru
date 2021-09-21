
import React from 'react';

import Card from './Card';

import styles from './default.module.scss';


function Cards() {
  return (
    <div className={styles['wrapper']}>
      <Card title={'Заказы'} />
    </div>
  );
}

Cards.propTypes = {};

Cards.defaultProps = {};

export default Cards;
