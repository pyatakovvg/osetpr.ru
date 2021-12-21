
import types from 'prop-types';
import React, { forwardRef, useMemo } from 'react';

import Loading from './Loading';

import cn from 'classnames';
import styles from './default.module.scss';


const Cart = forwardRef(({ title, count, mode, inProcess, disabled, onClick }, ref) => {
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
    <div ref={ref} className={cartClassName} title={title} onClick={() => handleClick()}>
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
});

Cart.propTypes = {
  title: types.string,
  disabled: types.bool,
  inProcess: types.bool,
  mode: types.oneOf(['success', 'default']),
};

Cart.defaultProps = {
  title: '',
  disabled: false,
  inProcess: false,
  mode: 'default',
};

Cart.mode = {
  success: 'success',
}

export default Cart;
