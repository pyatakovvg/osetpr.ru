
import { selectOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector } from 'react-redux';

import Empty from './Empty';
import Basket from './Basket';


function Order() {
  const order = useSelector(selectOrder);

  if ( ! order || ! order['products'].length) {
    return <Empty />;
  }

  return <Basket />;
}

export default Order;
