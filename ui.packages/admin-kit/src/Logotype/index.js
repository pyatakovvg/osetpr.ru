
import React from 'react';

import Line from './Line';
import Circle from './Circle';


export default function Factory({ type }) {
  switch(type) {
    case 'circle': return <Circle />;
    default: return <Line />;
  }
}
