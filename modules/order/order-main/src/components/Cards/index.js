
import { selectItems } from '@modules/order-main';

import React from 'react';
import { useSelector } from 'react-redux';

import Card from './Card';

import styles from './default.module.scss';


function Cards() {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      {items.map((item) => (
        <Card key={item['uuid']} {...item} />
      ))}
    </div>
  );
}

Cards.propTypes = {};

Cards.defaultProps = {};

export default Cards;
