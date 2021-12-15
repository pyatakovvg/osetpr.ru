
import numeral from '@packages/numeral';

import { Image } from '@ui.packages/client-kit';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Product({ externalId, title, imageUuid, number, value, price, total, currency }) {
  return (
    <div className={styles['wrapper']}>
      <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + externalId}>
        <Image src={imageUuid ? process.env['REACT_APP_API_HOST'] + '/gallery/' + imageUuid : null} />
      </Link>
      <div className={styles['content']}>
        <span className={styles['name']}>{ title }</span>
        <span className={styles['value']}>{ value }</span>
        <div className={styles['details']}>
          <span className={styles['number']}>{ number }</span>
          <span className={styles['price']}>х { numeral(price).format() }</span>
          <span className={styles['currency']}>{ currency['displayName'] }</span>
          <span className={styles['total-price']}>= { numeral(total).format() }</span>
          <span className={styles['total-currency']}>{ currency['displayName'] }</span>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  imageUuid: types.string,
  title: types.string,
  value: types.string,
  number: types.number,
  price: types.number,
  total: types.number,
  currency: types.object,
};

Product.defaultProps = {
  externalId: null,
  imageUuid: null,
  title: 'Нет названия',
  value: '---',
  number: 0,
  price: 0,
  total: 0,
  currency: { value: 'руб.' },
};
