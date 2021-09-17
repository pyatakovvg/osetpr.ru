
import { Mode } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import DarkDefault from './Dark/Default';

import LightDefault from './Dark/Default';


export default function CheckboxFactory({ theme, type, ...props }) {
  if (theme === 'light') {
    switch(type) {
      default: return <LightDefault {...props} />;
    }
  }
  if (theme === 'dark') {
    switch(type) {
      default: return <DarkDefault {...props} />;
    }
  }
}

CheckboxFactory.propTypes = {
  theme: types.oneOf(['dark', 'light']),
  className: types.string,
  label: types.string,
  mode: types.oneOf([Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS, Mode.DEFAULT]),
  disabled: types.bool,
  value: types.bool,
  onChange: types.func,
};

CheckboxFactory.defaultProps = {
  theme: 'light',
  mode: Mode.DEFAULT,
  disabled: false,
  value: false,
  label: null,
};
