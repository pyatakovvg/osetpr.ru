
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import Input from '../../symbols/InputMask';


function InputMaskField({ error, ...props }) {
  return (
    <BaseField {...props} message={error}>
      <Input />
    </BaseField>
  );
}

InputMaskField.propTypes = {
  className: types.string,
  name: types.string,
  mode: types.string,
  label: types.string,
  mask: types.string,
  disabled: types.bool,
  error: types.string,
};

InputMaskField.defaultProps = {
  className: '',
  name: 'field',
  mode: 'default',
  label: null,
  disabled: false,
  mask: '',
  error: null,
};

export default InputMaskField;
