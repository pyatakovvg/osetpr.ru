
import types from 'prop-types';
import React, { useMemo } from 'react';

import Loading from './Loading';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Add({ mode, inProcess, disabled, onClick }) {
  const cartClassName = useMemo(() => cn(styles['cart'], {
    [styles['mode--success']]: mode === Add.mode.success,
    [styles['disabled']]: disabled,
  }), [mode, disabled]);

  function handleClick() {
    if (disabled) {
      return void 0;
    }
    onClick();
  }

  return (
    <div className={cartClassName} onClick={() => handleClick()}>
      { ! inProcess && (
        <span className={cn(styles['icon'], 'fas fa-plus')} />
      )}
      {inProcess && (
        <Loading />
      )}
    </div>
  );
}

Add.propTypes = {
  disabled: types.bool,
  inProcess: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Add.defaultProps = {
  disabled: false,
  inProcess: false,
  mode: 'default',
};

Add.mode = {
  success: 'success',
}
