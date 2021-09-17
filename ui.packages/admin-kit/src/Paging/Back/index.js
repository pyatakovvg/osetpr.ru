
import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';
import cn from "classnames";


export default function Back({ type, disabled, onClick }) {
  function handleClick() {
    if (disabled) {
      return void 0;
    }
    onClick();
  }

  const wrapperClassName = cn(styles['wrapper'], {
    [styles['disabled']]: disabled,
  });
  const iconClassName = cn(styles['icon'], {
    'fas fa-angle-double-left': type === 'prev',
    'fas fa-angle-double-right': type === 'next',
  });

  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <span className={iconClassName} />
    </div>
  );
}

Back.propTypes = {
  type: types.oneOf(['prev', 'next']),
  disabled: types.bool,
  onClick: types.func,
};

Back.defaultProps = {
  type: 'prev',
  disabled: false,
  onClick: null,
};
