
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function ArrowControl({ disabled, isOpen, isHover }) {
  const rowClassName = cn(styles['row'], {
    [styles['row--hover']]: isHover,
  });
  const iconClassName = cn(styles['icon'], {
    'fas fa-caret-down': ! isOpen,
    'fas fa-caret-up': isOpen,
    [styles['disabled']]: disabled,
  });

  return (
    <div className={rowClassName}>
      <span className={iconClassName} />
    </div>
  );
}

ArrowControl.propTypes = {
  disabled: types.bool,
  isOpen: types.bool,
  isHover: types.bool,
};

ArrowControl.defaultProps = {
  disabled: false,
  isOpen: false,
  isHover: false,
};

export default ArrowControl;
