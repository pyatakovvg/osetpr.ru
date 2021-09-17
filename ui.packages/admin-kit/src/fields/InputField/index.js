
import types from 'prop-types';
import React from 'react';

import BaseField from '../BaseField';
import Input from '../../symbols/Input';


function InputField({ error, ...props }) {
  return (
    <BaseField {...props} message={error}>
      <Input />
    </BaseField>
  );
}

InputField.propTypes = {
  className: types.string,
  name: types.string,
  mode: types.string,
  label: types.string,
  type: types.string,
  disabled: types.bool,
  error: types.string,
};

InputField.defaultProps = {
  className: '',
  name: 'field',
  mode: 'default',
  label: null,
  disabled: false,
  type: 'text',
  error: null,
};

export default InputField;
