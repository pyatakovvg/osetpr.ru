
import types from 'prop-types';
import { Field } from 'redux-form';
import React from 'react';

import Evaluation from '../../symbols/Evaluation';


const InputField = ({ input, type, mode, size, label, meta: { touched, error } }) => {
  return (
    <Evaluation
      type={type}
      label={label}
      size={size}
      message={touched && error || ''}
      mode={(touched && error && 'danger') || mode}
      {...input}
      value={input['value'] || 0}
    />
  );
};

function EvaluationField({ name, label, mode, size, disabled }) {
  return (
    <Field name={name} mode={mode} size={size} label={label} disabled={disabled} component={InputField} />
  );
}

EvaluationField.propTypes = {
  label: types.string,
  name: types.string,
  mode: types.string,
  size: types.string,
  disabled: types.bool,
};

EvaluationField.defaultProps = {
  label: '',
  name: '',
  size: 'm',
  mode: 'default',
  disabled: false,
};

export default EvaluationField;
