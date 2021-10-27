
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Cart({ mode }) {
  const cartClassName = useMemo(() => cn(styles['cart'], {
    [styles['mode--success']]: mode === Cart.mode.success,
  }), [mode]);

  return (
    <div className={cartClassName}>
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
