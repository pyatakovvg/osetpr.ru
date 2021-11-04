
import types from 'prop-types';
import React, { useMemo } from 'react';

import Loading from './Loading';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Button({ mode, children, disabled, inProcess, onClick }) {
  const buttonClassName = useMemo(() => cn(styles['button'], {
    [styles['mode--success']]: mode === 'success',
    [styles['in-process']]: inProcess,
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
    <button className={buttonClassName} disabled={disabled} onClick={() => handleClick()}>
      { children }
      {inProcess && (
        <Loading />
      )}
    </button>
  );
}

Button.propTypes = {
  inProcess: types.bool,
  disabled: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Button.defaultProps = {
  inProcess: false,
  disabled: false,
  mode: 'default',
};

Button.mode = {
  success: 'success',
}
