
import types from 'prop-types';
import React, { useState } from 'react';
import MaskedInput from 'react-input-mask';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function changeTransform(value) {
  return value.replace(/[-\s_()]+/g, '');
}

function InputMask({ className, disabled, mode, label, message, onFocus, onBlur, onChange, ...props }) {
  const [isFocus, setFocus] = useState(false);

  function handleFocus(event) {
    const { value } = event['target'];

    event.stopPropagation();

    onFocus && onFocus(changeTransform(value));
    setFocus(true);
  }

  function handleBlur(event) {
    const { value } = event['target'];

    event.stopPropagation();

    onBlur && onBlur(changeTransform(value));
    setFocus(false);
  }

  function handleChange(event) {
    const { value } = event['target'];

    event.stopPropagation();

    onChange && onChange(changeTransform(value));
  }

  const classNameInputContainer = cn(className, styles['container'], {
    [styles['container--focus']]: isFocus,
  }, {
    [styles['container--primary']]: mode === PRIMARY_MODE,
    [styles['container--success']]: mode === SUCCESS_MODE,
    [styles['container--info']]: mode === INFO_MODE,
    [styles['container--danger']]: mode === DANGER_MODE,
    [styles['container--warning']]: mode === WARNING_MODE,
    [styles['container--disabled']]: disabled,
    [styles['container--with-label']]: !! label,
  });

  return (
    <div className={classNameInputContainer}>
      <MaskedInput
        className={styles['input']}
        disabled={disabled}
        maskplaceholder={'_'}
        alwaysShowMask={false}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleChange}
      />
    </div>
  );
}

InputMask.propTypes = {
  className: types.string,
  mask: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  value: types.any,
  disabled: types.bool,
  onChange: types.func,
  onInput: types.func,
  onFocus: types.func,
  onBlur: types.func,
};

InputMask.defaultProps = {
  className: '',
  mask: '',
  mode: 'default',
  label: null,
  message: null,
  value: '',
  disabled: false,
};

export default InputMask;
