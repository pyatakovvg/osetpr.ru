
import React from 'react';
import types from 'prop-types';

import Bold from './Bold';
import Small from './Small';
import Default from './Default';
import Description from './Description';


export default function Factory({ type, children, ...props }) {
  switch(type) {
    case Factory.type.bold: return <Bold {...props}>{ children }</Bold>;
    case Factory.type.small: return <Small {...props}>{ children }</Small>;
    case Factory.type.description: return <Description {...props}>{ children }</Description>;
    default: return <Default {...props}>{ children }</Default>;
  }
}

Factory.propTypes = {
  type: types.oneOf(['default', 'description', 'bold', 'small']),
};

Factory.defaultType = {
  type: 'default',
};

Factory.type = {
  default: 'default',
  bold: 'bold',
  small: 'small',
  description: 'description',
}
