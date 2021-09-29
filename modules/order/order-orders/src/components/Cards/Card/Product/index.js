
import numeral from '@packages/numeral';

import { Text } from '@ui.packages/admin-kit';

import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function Product({ title, vendor, value, number, price, currency }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>
        <Text>{ title }</Text>
      </div>
      <div className={styles['vendor']}>
        <Text>[{ vendor }]</Text>
      </div>
      <div className={styles['value']}>
        <Text>{ value }</Text>
      </div>
      <div className={styles['price']}>
        <Text type={Text.TYPE_BODY}>{ numeral(Number(price)).format() } { currency['value'] }</Text>
      </div>
      <span className={styles['delimiter']} />
      <div className={styles['number']}>
        <Text type={Text.TYPE_BODY}>{ number } шт.</Text>
      </div>
    </div>
  );
}

Product.propTypes = {
  title: types.string,
  vendor: types.string,
  value: types.string,
  number: types.number,
  price: types.number,
  currency: types.object,
};

Product.defaultProps = {
  title: 'No name',
  vendor: '---',
  value: '---',
  number: 0,
  price: 0,
  currency: {},
};

export default Product;
