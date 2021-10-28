
import React from 'react';
import types from 'prop-types';

import Level1 from './Level1';


export default function Factory({ level, children, ...props }) {
  switch(level) {
    default: return <Level1 {...props}>{ children }</Level1>;
  }
}

Factory.propTypes = {
  level: types.oneOf([1, 2, 3, 4]),
};

Factory.defaultType = {
  level: 1,
};
