
import React from 'react';
import types from 'prop-types';

import Price from './Price';

import styles from './default.module.scss';


export default function Mode({ count, value, price, currency, onClick }) {
  return (
    <div className={styles['wrapper']} onClick={onClick}>
      {count && (
        <span className={styles['count']}>{ count }</span>
      )}
      <div className={styles['content']}>
        <span className={styles['value']}>{ value }</span>
        <Price price={price} currency={currency['value']} />
      </div>
    </div>
  );
}

Mode.propTypes = {
  value: types.string,
};

Mode.defaultProps = {
  value: '',
};
