
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Page({ disabled, isActive, children, onClick }) {
  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) {
      return void 0;
    }
    onClick();
  }

  const wrapperClassName = cn(styles['wrapper'], {
    [styles['disabled']]: disabled,
  }, {
    [styles['active']]: isActive,
  });

  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <span className={styles['number']}>{ children }</span>
    </div>
  );
}

Page.propTypes = {
  disabled: types.bool,
  isActive: types.bool,
  children: types.any,
  onClick: types.func,
};

Page.defaultProps = {
  disabled: false,
  isActive: false,
  children: null,
  onClick: null,
};
