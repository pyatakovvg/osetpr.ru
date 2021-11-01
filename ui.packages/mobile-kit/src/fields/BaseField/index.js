
import React from 'react';
import types from 'prop-types';
import { Field } from 'redux-form';

import styles from "./default.module.scss";


function FieldComponent({ input, require, message, meta: { touched, error }, children, onChange, ...props }) {
  function handleChange(value) {
    if ('onChange' in input) {
      input.onChange(value);
    }
    onChange && onChange(value);
  }

  return (
    <div className={styles['wrapper']}>
      {React.cloneElement(children, {
        ...props,
        ...input,
        onChange: handleChange,
      })}
    </div>
  );
}


function BaseField({ children, ...props }) {
 return (
    <Field {...props} component={FieldComponent}>
      { children }
    </Field>
  );
}

BaseField.propTypes = {
  name: types.string,
  label: types.string,
  require: types.bool,
};

BaseField.defaultProps = {
  require: false,
};

export default BaseField;
