
import { Mode } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Checkbox({ className, disabled, mode, value, label, isFixed, onChange }) {
  function handleClick() {
    if (disabled) {
      return void 0;
    }

    if (isFixed && value) {
      value = false;
    }

    onChange && onChange( ! value);
  }

  const wrapperClassName = cn(styles['wrapper'], {
    [styles['disabled']]: disabled,
  });
  const classNameCheckbox = cn(styles['checkbox'], className, {
    [styles['checkbox--checked']]: value,
  }, {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--warning']]: mode === Mode.WARNING,
  });

  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <span className={classNameCheckbox}>
        {value && (
          <span className={cn(styles['checkbox__marker'], 'fas fa-check')} />
        )}
      </span>
      {label && (
        <span className={styles['label']}>{ label }</span>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf([Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS, Mode.DEFAULT]),
  disabled: types.bool,
  value: types.bool,
  onChange: types.func,
};

Checkbox.defaultProps = {
  mode: Mode.DEFAULT,
  disabled: false,
  value: false,
  label: null,
};

export default Checkbox;
