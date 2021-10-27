
import React from 'react';

import Price from './Price';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Mode({ isActive, value, price, currency, onClick }) {
  return (
    <div className={cn(styles['wrapper'], { [styles['active']]: isActive })} onClick={onClick}>
      {/*<span className={styles['marker']} />*/}
      <div className={styles['content']}>
        <span className={styles['value']}>{ value }</span>
        <Price price={price} currency={currency['value']} />
      </div>
    </div>
  );
}

Mode.propTypes = {};

Mode.defaultProps = {
  value: '1,200 гр.',
};
