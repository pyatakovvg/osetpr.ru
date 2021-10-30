
import numeral from '@packages/numeral';

import React from 'react';

import styles from './default.module.scss';


export default function Mode({ price, currency }) {
  return (
    <div className={styles['wrapper']}>
      <span className={styles['price']}>{ numeral(price).format() }</span>
      <span className={styles['currency']}>{ currency }</span>
    </div>
  );
}

Mode.propTypes = {};

Mode.defaultProps = {
  value: '1,200 гр.',
};
