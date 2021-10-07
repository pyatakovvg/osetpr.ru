
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';
import moment from "moment";


const DATEPICKER_DISPLAY_FORMAT = 'DD.MM.YYYY';
const DATEPICKER_DISPLAY_FORMAT_WITH_TIME = 'DD.MM.YYYY - HH:mm';

const DATEPICKER_PLACEHOLDER = '__.__.____';
const DATEPICKER_PLACEHOLDER_WITH_TIME = '__.__.____ - __:__';


function Select({ className, readOnly, useTime, mode, value, clearable, disabled, isFocus, onClick, onReset }) {
  const dateValue = value ? moment(value).format(useTime ? DATEPICKER_DISPLAY_FORMAT_WITH_TIME : DATEPICKER_DISPLAY_FORMAT) : null;

  const wrapperClassName = useMemo(() => {
    return cn(styles['wrapper'], className, {
      [styles['mode--primary']]: mode === Select.mode.PRIMARY,
      [styles['mode--success']]: mode === Select.mode.SUCCESS,
      [styles['mode--danger']]: mode === Select.mode.DANGER,
      [styles['mode--warning']]: mode === Select.mode.WARNING,
    }, {
      [styles['focus']]: isFocus,
    }, {
      [styles['disabled']]: disabled,
    }, {
      [styles['read-only']]: readOnly,
    });
  }, [className, disabled, mode, readOnly, isFocus]);

  const clearIconClassName = useMemo(() => cn(styles['icon'], 'fas fa-times'), []);
  const arrowIconClassName = useMemo(() => cn(styles['icon'], 'far fa-calendar-alt'), []);

  function handleChange() {
    onClick();
  }

  function handleReset(event) {
    event.stopPropagation();

    onReset();
  }

  return (
    <div className={wrapperClassName} onClick={handleChange}>
      <div className={styles['value']}>
        { ! dateValue && (
          <span className={styles['placeholder']}>{ useTime ? DATEPICKER_PLACEHOLDER_WITH_TIME : DATEPICKER_PLACEHOLDER }</span>
        )}
        {dateValue && (
          <span className={styles['text']}>{ dateValue }</span>
        )}
      </div>
      {clearable && dateValue && (
        <div className={styles['reset']} onClick={handleReset}>
          <span className={clearIconClassName} />
        </div>
      )}
      <div className={styles['arrow']}>
        <span className={arrowIconClassName} />
      </div>
    </div>
  );
}

Select.mode = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
};

Select.propTypes = {
  className: types.string,
  mode: types.oneOf([
    Select.mode.DEFAULT,
    Select.mode.PRIMARY,
    Select.mode.SUCCESS,
    Select.mode.DANGER,
    Select.mode.WARNING,
  ]),
  value: types.oneOfType([
    types.string,
    types.number,
    types.object,
  ]),
  readOnly: types.bool,
  placeholder: types.string,
  clearable: types.bool,
  disabled: types.bool,
  onClick: types.func,
};

Select.defaultProps = {
  className: null,
  readOnly: false,
  mode: Select.mode.DEFAULT,
  placeholder: 'Сделайте выбор',
  value: null,
  clearable: false,
  disabled: false,
};

export default Select;
