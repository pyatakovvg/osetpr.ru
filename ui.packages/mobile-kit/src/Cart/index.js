
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Cart({ count, mode, inProcess, onClick }) {
  const cartClassName = useMemo(() => cn(styles['cart'], {
    [styles['mode--success']]: mode === Cart.mode.success,
    [styles['in-process']]: inProcess,
  }), [mode]);
console.log(inProcess)
  function handleClick() {
    onClick();
  }

  return (
    <div className={cartClassName} onClick={() => handleClick()}>
      {count > 0 && (
        <span className={styles['count']}>{ count }</span>
      )}
      <span className={styles['icon']} />
    </div>
  );
}

Cart.propTypes = {
  inProcess: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Cart.defaultType = {
  inProcess: false,
  mode: 'default',
};

Cart.mode = {
  success: 'success',
}
