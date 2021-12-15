
import numeral from "@packages/numeral";
import { selectOrder } from "@ui.packages/order";

import types from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from "react-redux";

import cn from 'classnames';
import styles from './default.module.scss';


function useGetOrderProducts() {
  const order = useSelector(selectOrder);
  return useMemo(() => order ? order['products'] : [], [order && order['products']]);
}

export default function Mode({ uuid, isActive, value, price, currency, onClick }) {
  const orderProducts = useGetOrderProducts();

  const product = orderProducts.find((product) => product['modeUuid'] === uuid);
  const count = product ? product['number'] : null;

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
