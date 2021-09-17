
import React from 'react';
import types from 'prop-types';
import { Field } from 'redux-form';

import RadioBox from '../../symbols/RadioBox';


const InputField = ({ input, mode, ...props }) => {
  return (
    <RadioBox {...input} {...props} />
  );
};

function RadioBoxField({ name, ...props }) {
  return (
    <Field name={name} {...props} component={InputField} />
  );
}

RadioBoxField.propTypes = {
  name: types.string,
  disabled: types.bool,
};

export default RadioBoxField;
