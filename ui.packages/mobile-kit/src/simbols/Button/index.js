
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Button({ mode, children, disabled, onClick }) {
  const buttonClassName = useMemo(() => cn(styles['button'], {
    [styles['mode--success']]: mode === 'success',
  }), [mode]);

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button className={buttonClassName} disabled={disabled} onClick={() => handleClick()}>
      { children }
    </button>
  );
}

Button.propTypes = {
  disabled: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Button.defaultType = {
  disabled: false,
  mode: 'default',
};

Button.mode = {
  success: 'success',
}
