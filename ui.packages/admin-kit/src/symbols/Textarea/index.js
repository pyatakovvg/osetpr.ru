
import { Mode } from '@ui.packages/types';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Textarea({ className, disabled, mode, label, message, ...props }) {
  const classNameTextareaWrapper = cn(className, styles['wrapper'], {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--warning']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
  }, {
    [styles['wrapper--disabled']]: disabled,
  });

  return (
    <div className={classNameTextareaWrapper}>
      <textarea className={styles['textarea']} disabled={disabled}  {...props} />
    </div>
  );
}

Textarea.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf([Mode.DEFAULT, Mode.DANGER, Mode.INFO, Mode.SUCCESS, Mode.PRIMARY, Mode.WARNING]),
  value: types.string,
  disabled: types.bool,
  message: types.string,
  onChange: types.func,
  onInput: types.func,
};

Textarea.defaultProps = {
  className: '',
  mode: Mode.DEFAULT,
  label: null,
  message: null,
  value: '',
  disabled: false,
};

export default Textarea;
