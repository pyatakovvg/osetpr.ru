
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


const TYPE_BUTTON = 'button';
const TYPE_SUBMIT = 'submit';


export default function DefaultButton({ className, type, children, disabled, mode, size, onClick }) {
  const classNameButton = cn(className, styles['button'], {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--warning']]: mode === Mode.WARNING,
  }, {
    [styles['disabled']]: disabled,
  }, {
    [styles['size--small']]: size === Size.SMALL,
    [styles['size--large']]: size === Size.LARGE,
  });

  return (
    <button
      type={type}
      className={classNameButton}
      disabled={disabled}
      onClick={() => onClick && onClick()}
    >
      { children }
    </button>
  );
}

DefaultButton.propTypes = {
  className: types.string,
  type: types.oneOf([TYPE_BUTTON, TYPE_SUBMIT]),
  mode: types.oneOf([Mode.INFO, Mode.DANGER, Mode.PRIMARY, Mode.SUCCESS, Mode.WARNING, Mode.DEFAULT]),
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  children: types.any,
  disabled: types.bool,
  onClick: types.func,
};

DefaultButton.defaultProps = {
  className: null,
  type: TYPE_BUTTON,
  mode: Mode.DEFAULT,
  size: Size.MEDIUM,
  disabled: false,
  children: 'Button',
  onClick: null,
};
