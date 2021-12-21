
import { Cart } from '@ui.packages/client-kit';
import { selectOrder, selectInProcess } from '@ui.packages/order';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

import styles from "./default.module.scss";


function useCountOrderProducts() {
  const order = useSelector(selectOrder);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(order ? order['products'].reduce((acc, cur) => acc + cur['number'], 0) : 0);
  }, [order]);
  return count;
}


export default function CartButton({ isOut }) {
  const cartRef = useRef(null);

  const navigate = useNavigate();
  const count = useCountOrderProducts();

  const inProcess = useSelector(selectInProcess);

  function handleOrder() {
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  if (isOut) {
    return (
      <div className={styles['wrapper']}>
        <Cart
          title={'Перейти к оформлению заказа'}
          ref={cartRef}
          count={count}
          inProcess={inProcess}
          onClick={() => handleOrder()}
        />
      </div>
    );
  }

  return (
    <Cart
      title={'Перейти к оформлению заказа'}
      ref={cartRef}
      count={count}
      inProcess={inProcess}
      onClick={() => handleOrder()}
    />
  );
}
