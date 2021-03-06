
import React from 'react';
import types from 'prop-types';

import Default from './Default';


export default function Factory({ type, children, ...props }) {
  switch(type) {
    default: return <Default {...props}>{ children }</Default>;
  }
}

Factory.propTypes = {
  type: types.oneOf(['default']),
};

Factory.defaultType = {
  type: 'default',
};
