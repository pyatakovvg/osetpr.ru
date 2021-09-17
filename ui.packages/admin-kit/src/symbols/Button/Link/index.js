
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function LinkButton({ className, href, target, children, disabled, mode, size }) {
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
    <a
      href={href}
      target={target}
      className={classNameButton}
    >
      { children }
    </a>
  );
}

LinkButton.propTypes = {
  className: types.string,
  href: types.string,
  target: types.string,
  mode: types.oneOf([
    Mode.INFO,
    Mode.DANGER,
    Mode.PRIMARY,
    Mode.SUCCESS,
    Mode.WARNING,
    Mode.DEFAULT
  ]),
  size: types.oneOf([
    Size.SMALL,
    Size.MEDIUM,
    Size.LARGE
  ]),
  children: types.any,
  disabled: types.bool,
};

LinkButton.defaultProps = {
  className: null,
  href: '#',
  target: '_blank',
  mode: Mode.DEFAULT,
  size: Size.MEDIUM,
  disabled: false,
  children: 'Button Link',
};

export default LinkButton;
