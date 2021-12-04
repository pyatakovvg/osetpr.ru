
import types from 'prop-types';
import React, { useMemo, useState } from 'react';
import PhoneInput from 'react-input-mask';

import cn from 'classnames';
import styles from './default.module.scss';


function Input({ mode, label, name, value, readOnly, require, onChange, onFocus, onBlur, ...props }) {
  const [isFocus, setFocus] = useState(false);

  const titleClassName = useMemo(() => cn(styles['title'], {
    [styles['is-focus']]: value || isFocus,
    [styles['require']]: require,
  }), [mode, isFocus]);
  const contentClassName = useMemo(() => cn(styles['content'], {
    [styles['mode--success']]: mode === 'success',
  }), [mode]);
  const elementClassName = useMemo(() => cn(styles['element'], {

  }), [mode]);

  function handleFocus(event) {
    setFocus(true);
    onFocus(event);
  }

  function handleChange(event) {
    setFocus(true);
    onChange(event['target']['value'].replace(/[^+\d]/g, ''));
  }

  function handleBlur(event) {
    setFocus(false);
    onBlur(event['target']['value'].replace(/[^+\d]/g, ''));
  }

  return (
    <div className={styles['wrapper']}>
      <span className={titleClassName}>{ label }</span>
      <div className={contentClassName}>
        <PhoneInput
          className={elementClassName}
          name={name}
          value={value}
          {...props}
          mask='+7 (999) 999-99-99'
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  require: types.bool,
  readOnly: types.bool,
  mode: types.oneOf(['danger', 'default']),
};

Input.defaultType = {
  require: false,
  readOnly: false,
  mode: 'default',
};

Input.mode = {
  danger: 'danger',
}

export default Input;
