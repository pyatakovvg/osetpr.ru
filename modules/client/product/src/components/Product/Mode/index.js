
import numeral from "@packages/numeral";

import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Mode({ isActive, count, value, price, currency, onClick }) {
  const wrapperClassName = useMemo(() => cn(styles['wrapper'], {
    [styles['active']]: isActive,
  }), [isActive]);

  return (
    <div className={wrapperClassName} onClick={onClick}>
      {count && (
        <span className={styles['count']}>{ count }</span>
      )}
      <div className={styles['content']}>
        <span className={styles['value']}>{ value }</span>
        <div className={styles['amount']}>
          <span className={styles['price']}>{ numeral(price).format() }</span>
          <span className={styles['currency']}>{ currency['displayName'] }</span>
        </div>
      </div>
    </div>
  );
}

Mode.propTypes = {
  isActive: types.bool,
  count: types.number,
  price: types.number,
  currency: types.object,
  value: types.string,
  onClick: types.func,
};

Mode.defaultProps = {
  isActive: false,
  count: null,
  price: 0,
  currency: {},
  value: '',
};
