
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Button({ type, size, mode, children, disabled, inProcess, onClick }) {
  const buttonClassName = useMemo(() => cn(styles['button'], {
    [styles['mode--danger']]: mode === 'danger',
    [styles['mode--success']]: mode === 'success',
  }, {
    [styles['size--small']]: size === 'small',
  }), [mode, inProcess]);

  function handleClick() {
    if (inProcess || disabled) {
      return void 0;
    }
    if (onClick) {
      onClick();
    }
  }

  return (
    <button className={buttonClassName} type={type} disabled={disabled} onClick={() => handleClick()}>
      { children }
    </button>
  );
}
