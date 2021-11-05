
import { selectStep, selectOrder } from '@ui.packages/order';

import React from 'react';
import { useSelector } from 'react-redux';

import Empty from './Empty';
import Basket from './Basket';
import Client from './Client';


function Order() {
  const step = useSelector(selectStep);
  const order = useSelector(selectOrder);

  if ( ! order || ! order['products'].length) {
    return <Empty />;
  }

  if (step === 1) {
    return <Client />;
  }
  return <Basket />;
}

export default Order;
