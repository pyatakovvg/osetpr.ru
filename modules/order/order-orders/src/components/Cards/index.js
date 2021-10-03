
import { selectItems } from '@modules/order-orders';

import React from 'react';
import { useSelector } from 'react-redux';

import Card from './Card';
import Empty from './Empty';

import styles from './default.module.scss';


function Cards() {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      { ! items.length && <Empty />}
      {items.map((item) => (
        <Card key={item['uuid']} {...item} />
      ))}
    </div>
  );
}

Cards.propTypes = {};

Cards.defaultProps = {};

export default Cards;
