
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function ResetControl({ disabled, isHover, onClick }) {
  const rowClassName = cn(styles['row'], {
    [styles['row--hover']]: isHover,
  });
  const iconClassName = cn(styles['icon'], 'fas fa-times', {
    [styles['disabled']]: disabled,
  });

  function handleClick(event) {
    if (disabled) {
      return void 0;
    }
    onClick(event);
  }

  return (
    <div className={rowClassName} onClick={handleClick}>
      <span className={iconClassName} />
    </div>
  );
}

ResetControl.propTypes = {
  disabled: types.bool,
};

ResetControl.defaultProps = {
  disabled: false,
};

export default ResetControl;
