
import types from 'prop-types';
import React, { useMemo } from 'react';

import Loading from './Loading';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Cart({ count, mode, inProcess, disabled, onClick }) {
  const cartClassName = useMemo(() => cn(styles['cart'], {
    [styles['mode--success']]: mode === Cart.mode.success,
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
      {count > 0 && (
        <span className={styles['count']}>{ count }</span>
      )}
      { ! inProcess && (
        <span className={styles['icon']} />
      )}
      {inProcess && (
        <Loading />
      )}
    </div>
  );
}

Cart.propTypes = {
  disabled: types.bool,
  inProcess: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Cart.defaultProps = {
  disabled: false,
  inProcess: false,
  mode: 'default',
};

Cart.mode = {
  success: 'success',
}
