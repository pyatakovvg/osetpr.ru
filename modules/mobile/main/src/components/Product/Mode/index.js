
import React from 'react';

import Price from './Price';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Mode({ isActive, count, value, price, currency, onClick }) {
  return (
    <div className={cn(styles['wrapper'], { [styles['active']]: isActive })} onClick={onClick}>
      {count && (
        <span className={styles['count']}>{ count }</span>
      )}
      <div className={styles['content']}>
        <span className={styles['value']}>{ value }</span>
        <Price price={price} currency={currency['value']} />
      </div>
      {isActive && (
        <span className={styles['marker']} />
      )}
    </div>
  );
}

Mode.propTypes = {};

Mode.defaultProps = {
  value: '1,200 гр.',
};
