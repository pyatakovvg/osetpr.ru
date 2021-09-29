
import { Mode } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Status({ mode, children }) {
  const statusClassName = cn(styles['status'], {
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--warning']]: mode === Mode.WARNING,
    [styles['mode--danger']]: mode === Mode.DANGER,
  });
  return (
    <div className={statusClassName}>
      <p className={styles['text']}>{ children }</p>
    </div>
  );
}

Status.propTypes = {
  className: types.string,
  mode: types.oneOf([Mode.DEFAULT, Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS]),
  children: types.string,
};

Status.defaultProps = {
  className: null,
  mode: Mode.DEFAULT,
  children: 'Status',
};

export default Status;