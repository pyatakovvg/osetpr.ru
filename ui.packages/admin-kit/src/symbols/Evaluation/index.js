
import { Mode, Size } from '@ui.packages/types';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Evaluation({ className, disabled, label, mode, size, value, onChange }) {
  function handleClick(index) {
    onChange && onChange(index);
  }

  const classNameInputWrapper = cn(className, styles['wrapper'], {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
    [styles['mode--warning']]: mode === Mode.WARNING,
  }, {
    [styles['disabled']]: disabled,
  }, {
    [styles['with-label']]: !! label,
  }, {
    [styles['size--small']]: size === Size.SMALL,
    [styles['size--large']]: size === Size.LARGE,
  });

  return (
    <div className={classNameInputWrapper}>
      {label && (
        <p className={styles['label']}>{ label }</p>
      )}
      <div className={styles['container']}>
        <div className={styles['evaluation']}>
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 1, 'far fa-star': value < 1 })} onClick={handleClick.bind(this, 1)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 2, 'far fa-star': value < 2 })} onClick={handleClick.bind(this, 2)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 3, 'far fa-star': value < 3 })} onClick={handleClick.bind(this, 3)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 4, 'far fa-star': value < 4 })} onClick={handleClick.bind(this, 4)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 5, 'far fa-star': value < 5 })} onClick={handleClick.bind(this, 5)} />
        </div>
      </div>
    </div>
  );
}

Evaluation.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf([Mode.DEFAULT, Mode.DANGER, Mode.INFO, Mode.SUCCESS, Mode.PRIMARY, Mode.WARNING]),
  value: types.oneOf([0, 1, 2, 3, 4, 5]),
  size: types.oneOf([Size.SMALL, Size.LARGE]),
  disabled: types.bool,
  onChange: types.func,
};

Evaluation.defaultProps = {
  className: '',
  label: '',
  mode: 'default',
  value: 0,
  size: Size.MEDIUM,
  disabled: false,
};

export default Evaluation;
