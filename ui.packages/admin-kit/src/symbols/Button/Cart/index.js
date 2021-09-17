
import { Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function ContextButton({ className, disabled, size, onClick }) {
  const classNameButton = cn(styles['button'], className, {
    [styles['size--small']]: size === Size.SMALL,
    [styles['size--large']]: size === Size.LARGE,
  });

  return (
    <button
      type="button"
      className={classNameButton}
      disabled={disabled}
      onClick={(event) => onClick && onClick(event)}
    >
      <span className={styles['caption']}>В корзину</span>
      <span className="fas fa-shopping-cart" />
    </button>
);
}

ContextButton.propTypes = {
  className: types.string,
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  disabled: types.bool,
  onClick: types.func,
};

ContextButton.defaultProps = {
  className: null,
  size: Size.MEDIUM,
  disabled: false,
  onClick: null,
};
