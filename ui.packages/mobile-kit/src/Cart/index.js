
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Cart({ mode, onClick }) {
  const cartClassName = useMemo(() => cn(styles['cart'], {
    [styles['mode--success']]: mode === Cart.mode.success,
  }), [mode]);

  function handleClick() {
    onClick();
  }

  return (
    <div className={cartClassName} onClick={() => handleClick()}>
      <span className={styles['icon']} />
    </div>
  );
}

Cart.propTypes = {
  mode: types.oneOf(['success', 'default']),
};

Cart.defaultType = {
  mode: 'default',
};

Cart.mode = {
  success: 'success',
}
