
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Status({ className, mode, children }) {
  const statusClassName = useMemo(() => cn(styles['wrapper'], className, {
    [styles['mode--success']]: mode === 'success',
    [styles['mode--primary']]: mode === 'primary',
    [styles['mode--danger']]: mode === 'danger',
  }), [className, mode]);

  return (
    <span className={statusClassName}>{ children }</span>
  );
}

export default Status;
