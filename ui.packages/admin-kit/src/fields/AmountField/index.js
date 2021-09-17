
import types from 'prop-types';
import { Field } from 'redux-form';
import React from 'react';

import Amount from '../../symbols/Amount';


const InputField = ({ input, label, mode, ...props }) => {
  return (
    <Amount {...input} {...props} />
  );
};

function AmountField({ name, label, ...props }) {
  return (
    <Field name={name} label={label} {...props} component={InputField} />
  );
}

AmountField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
};

export default AmountField;
