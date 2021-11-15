
import { selectOrder } from '@ui.packages/order';

import types from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from "react-redux";

import Price from './Price';

import cn from 'classnames';
import styles from './default.module.scss';


function useGetOrderProducts() {
  const order = useSelector(selectOrder);
  return useMemo(() => order ? order['products'] : [], [order && order['products']]);
}

export default function Mode({ uuid, isActive, disabled, value, price, currency, onClick }) {
  const orderProducts = useGetOrderProducts();

  const product = orderProducts.find((product) => product['modeUuid'] === uuid);
  const count = product ? product['number'] : null;

  const wrapperClassName = useMemo(() => cn(styles['wrapper'], {
    [styles['active']]: isActive,
    [styles['disabled']]: disabled,
  }), [disabled, isActive]);

  function handleClick() {
    if (disabled) {
      return void 0;
    }
    onClick();
  }

  return (
    <div className={wrapperClassName} onClick={() => handleClick()}>
      {count && (
        <span className={styles['count']}>{ count }</span>
      )}
      <div className={styles['content']}>
        <span className={styles['value']}>{ value }</span>
        <Price price={price} currency={currency['displayName']} />
      </div>
    </div>
  );
}

Mode.propTypes = {
  value: types.string,
  disabled: types.bool,
  isActive: types.bool,
  count: types.number,
  price: types.number,
  currency: types.object,
  onClick: types.func,
};

Mode.defaultProps = {
  value: '',
  disabled: false,
  isActive: true,
  count: 0,
  price: 0,
  currency: { displayName: 'none' },
};
