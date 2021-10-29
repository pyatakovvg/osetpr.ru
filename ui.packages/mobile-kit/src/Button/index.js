
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Button({ mode, children }) {
  const buttonClassName = useMemo(() => cn(styles['button'], {
    [styles['mode--success']]: mode === 'success',
  }), [mode]);

  return (
    <button className={buttonClassName}>
      { children }
    </button>
  );
}

Button.propTypes = {
  mode: types.oneOf(['success', 'default']),
};

Button.defaultType = {
  mode: 'default',
};

Button.mode = {
  success: 'success',
}
