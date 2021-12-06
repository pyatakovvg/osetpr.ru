
import { Cart } from '@ui.packages/client-kit';
import { selectOrder, selectInProcess } from '@ui.packages/order';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function useCountOrderProducts() {
  const order = useSelector(selectOrder);
  return order ? order['products'].reduce((acc, cur) => acc + cur['number'], 0) : 0;
}

export default function CartButton() {
  const navigate = useNavigate();
  const count = useCountOrderProducts();

  const inProcess = useSelector(selectInProcess);

  function handleOrder() {
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return (
    <Cart
      count={count}
      inProcess={inProcess}
      onClick={() => handleOrder()}
    />
  );
}
