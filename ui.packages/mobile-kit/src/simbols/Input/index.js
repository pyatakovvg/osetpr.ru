
import types from 'prop-types';
import React, { useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Input({ mode, label, name, value, onChange, onFocus, onBlur, ...props }) {
  const [isFocus, setFocus] = useState(false);

  const titleClassName = useMemo(() => cn(styles['title'], {
    [styles['is-focus']]: value || isFocus,
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
    onChange(event);
  }

  function handleBlur(event) {
    setFocus(false);
    onBlur(event);
  }

  return (
    <div className={styles['wrapper']}>
      <span className={titleClassName}>{ label }</span>
      <div className={contentClassName}>
        <input
          className={elementClassName}
          name={name}
          value={value}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  mode: types.oneOf(['danger', 'default']),
};

Input.defaultType = {
  mode: 'default',
};

Input.mode = {
  danger: 'danger',
}

export default Input;
