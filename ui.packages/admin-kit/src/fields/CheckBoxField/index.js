
import React from 'react';
import types from 'prop-types';
import { Field } from 'redux-form';

import CheckBox from '../../symbols/CheckBox';


const InputField = ({ input, label, mode, meta: { touched, error }, ...props }) => {
  let value = input['value'];
  if (typeof value !== 'boolean') {
    value = false;
  }

  return (
    <CheckBox label={label} {...input} value={value} {...props} mode={mode || (touched && error && 'danger' || 'default')} />
  );
};

function CheckBoxField({ name, label, ...props }) {
  return (
    <Field name={name} label={label} {...props} component={InputField} />
  );
}

CheckBoxField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
};

export default CheckBoxField;
