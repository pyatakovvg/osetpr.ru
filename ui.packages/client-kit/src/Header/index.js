
import React from 'react';
import types from 'prop-types';

import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';


export default function Factory({ level, children, ...props }) {
  switch(level) {
    case 2: return <Level2 {...props}>{ children }</Level2>;
    case 3: return <Level3 {...props}>{ children }</Level3>;
    default: return <Level1 {...props}>{ children }</Level1>;
  }
}

Factory.propTypes = {
  level: types.oneOf([1, 2, 3]),
};

Factory.defaultType = {
  level: 1,
};
