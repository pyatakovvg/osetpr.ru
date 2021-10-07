
import React from 'react';
import types from 'prop-types';

import Datepicker, { Mode, Type } from "./Default";


function Decorator({ label, labelAlign, ...props }) {
  return <Datepicker {...props} />;
}

Decorator.type = Type;
Decorator.mode = Mode;

Decorator.propTypes = {
  label: types.string,
  labelAlign: types.string,
};

Decorator.defaultProps = {
  label: null,
  labelAlign: null,
};

export default Decorator;
