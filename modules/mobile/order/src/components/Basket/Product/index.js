
import numeral from '@packages/numeral';

import { Image, Counter } from '@ui.packages/mobile-kit';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Product({ uuid, productUuid, title, gallery, number, value, price, total, currency, onChange, onRemove }) {
  function handleChange(number) {
    onChange({
      uuid,
      number,
      productUuid,
    });
  }

  return (
    <div className={styles['wrapper']}>
      <span className={styles['remove']} onClick={() => onRemove(uuid)} />
      <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + productUuid}>
        <Image src={gallery[0] ? process.env['PUBLIC_URL'] + '/gallery/' + gallery[0]['uuid'] : null} />
      </Link>
      <div className={styles['content']}>
        <span className={styles['name']}>{ title }</span>
        <span className={styles['value']}>{ value }</span>
        <div className={styles['control']}>
          <div className={styles['counter']}>
            <Counter number={number} onClick={(count) => handleChange(count)} />
          </div>
          <div className={styles['amount']}>
            <span className={styles['price']}>х { numeral(price).format() }</span>
            <span className={styles['currency']}>{ currency['value'] }</span>
          </div>
        </div>
        <div className={styles['details']}>
          <span className={styles['total-price']}>= { numeral(total).format() }</span>
          <span className={styles['total-currency']}>{ currency['value'] }</span>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  gallery: types.array,
  title: types.string,
  value: types.string,
  number: types.number,
  price: types.number,
  total: types.number,
  currency: types.object,
};

Product.defaultProps = {
  externalId: null,
  gallery: [],
  title: 'Нет названия',
  value: '---',
  number: 0,
  price: 0,
  total: 0,
  currency: { value: 'руб.' },
};
