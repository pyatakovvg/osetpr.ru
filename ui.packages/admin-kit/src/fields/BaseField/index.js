
import { Mode } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';
import { Field } from 'redux-form';

import cn from "classnames";
import styles from "./default.module.scss";


function FieldComponent({ input, label, require, disabled, message, meta: { touched, error, warning }, children, onChange, ...props }) {
  function handleChange(value) {
    if ('onChange' in input) {
      input.onChange(value);
    }
    onChange && onChange(value);
  }

  let mode = Mode.DEFAULT;

  if (touched && (error || message)) {
    mode = Mode.DANGER;
  }

  if (touched && warning) {
    mode = Mode.WARNING;
  }

  const hasError = ! disabled && (error || message) && touched;
  const classNameInputWrapper = cn(styles['wrapper'], {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--warning']]: mode === Mode.WARNING,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['disabled']]: disabled,
  });

  return (
    <div className={classNameInputWrapper}>
      {label && (
        <p className={cn(styles['label'], {
          [styles['label--require']]: require,
        })}>{ label }</p>
      )}
      <div className={styles['container']}>
        {React.cloneElement(children, {
          ...props,
          ...input,
          disabled,
          mode: mode,
          className: hasError ? styles['border-right-bottom-none'] : '',
          onChange: handleChange,
        })}
        {hasError && (
          <span className={styles['error']}>
            <span className={styles['error__message']}>{ message || error }</span>
          </span>
        )}
      </div>
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
