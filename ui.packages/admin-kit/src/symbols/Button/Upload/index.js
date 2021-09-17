
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function CreateButton({ className, mode, children, disabled, size, onClick }) {
  const classNameButton = cn(styles['button'], className, {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--warning']]: mode === Mode.WARNING,
  }, {
    [styles['disabled']]: disabled,
    [styles['size--small']]: size === Size.SMALL,
    [styles['size--large']]: size === Size.LARGE,
  });

  function handleClick(event) {
    if (disabled) {
      return void 0;
    }
    onClick && onClick(event);
  }

  return (
    <button
      type="button"
      className={classNameButton}
      disabled={disabled}
      onClick={(event) => handleClick(event)}
    >
      <span className="fas fa-file-import" />
      <span className={styles['caption']}>{ children }</span>
    </button>
);
}

CreateButton.propTypes = {
  className: types.string,
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  disabled: types.bool,
  onClick: types.func,
};

CreateButton.defaultProps = {
  className: null,
  size: Size.MEDIUM,
  disabled: false,
  onClick: null,
};

export default CreateButton;
