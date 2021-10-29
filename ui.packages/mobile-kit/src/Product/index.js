
import React from 'react';

import Default from './Default';
import OrderProduct from './OrderProduct';


export default function Product({ type, ...props }) {
  switch(type) {
    case 'order': return <OrderProduct {...props} />
    default: return <Default {...props} />
  }
}
