
import React from 'react';
import types from 'prop-types';

import Level1 from './Level1';
import Level2 from './Level2';


export default function Factory({ level, children, ...props }) {
  switch(level) {
    case 2: return <Level2 {...props}>{ children }</Level2>;
    default: return <Level1 {...props}>{ children }</Level1>;
  }
}

Factory.propTypes = {
  level: types.oneOf([1, 2, 3, 4]),
};

Factory.defaultType = {
  level: 1,
};
