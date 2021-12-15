
import types from 'prop-types';
import React from 'react';

import Default from './Default';
import Context from './Context';


function Factory({ form, ...props }) {
  switch(form) {
    case 'context': return <Context {...props} />;
    default: return <Default {...props} />;
  }
}

Factory.propTypes = {
  size: types.oneOf(['small', 'default']),
  form: types.oneOf(['default', 'context']),
  type: types.oneOf(['button', 'submit']),
  inProcess: types.bool,
  disabled: types.bool,
  mode: types.oneOf(['success', 'primary', 'danger', 'default']),
};

Factory.defaultProps = {
  form: 'default',
  type: 'submit',
  inProcess: false,
  disabled: false,
  mode: 'default',
};

Factory.mode = {
  success: 'success',
}

export default Factory;
