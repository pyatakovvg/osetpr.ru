
import types from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import Select from './Select';
import Dashboard from './Dashboard';

import styles from './default.module.scss';


export const Mode = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
};

export const Type = {
  DEFAULT: 'default',
};


function DatepickerDefault({ className, useTime, readOnly, mode, value, outFormat, displayFormat, clearable, disabled, minDate, maxDate, onFocus, onChange, onBlur }) {
  const wrapperRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  function handleClick() {
    if (disabled) {
      return void 0;
    }

    if (readOnly) {
      return void 0;
    }

    setOpen( ! isOpen);
  }

  function handleReset() {
    if (disabled) {
      return void 0;
    }

    if (onChange) {
      onChange(null);
    }
  }

  function handleChange(value) {
    if (disabled) {
      return void 0;
    }
    if (onChange) {
      onChange(value.format(outFormat));
    }
    setOpen(false);
  }

  useEffect(function attachScrollEvents() {
    const scroller = document.querySelector('#scroller');

    function handleClose() {
      if (isOpen) {
        setOpen(false);
      }
    }

    if (scroller) {
      scroller.addEventListener('scroll', handleClose);
    }
    return function() {
      if (scroller) {
        scroller.removeEventListener('scroll', handleClose);
      }
    };
  }, [isOpen]);

  useEffect(function attachClickEvents() {
    function handleOutClick({ target }) {
      const { current } = wrapperRef;

      if (current) {
        if ( ! current.contains(target)) {
          setOpen(false);
        }
      }
    }

    document.body.addEventListener('click', handleOutClick);
    return function() {
      document.body.removeEventListener('click', handleOutClick);
    };
  }, []);

  useEffect(function handleLifecycle() {
    if (isOpen) {
      if (onFocus) {
        onFocus();
      }
    }
    return () => {
      if (isOpen) {
        if (onBlur) {
          onBlur();
        }
      }
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={styles['wrapper']}>
      <Select
        className={className}
        readOnly={readOnly}
        useTime={useTime}
        mode={mode}
        value={value}
        displayFormat={displayFormat}
        clearable={clearable && ! readOnly}
        disabled={disabled}
        isFocus={isOpen}
        onClick={handleClick}
        onReset={handleReset}
      />
      {isOpen && (
        <Dashboard
          parentRef={wrapperRef['current']}
          useTime={useTime}
          isOpen={isOpen}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

DatepickerDefault.propTypes = {
  className: types.string,
  mode: types.oneOf([
    Mode.DEFAULT,
    Mode.PRIMARY,
    Mode.SUCCESS,
    Mode.DANGER,
    Mode.WARNING,
  ]),
  readOnly: types.bool,
  useTime: types.bool,
  value: types.string,
  outFormat: types.string,
  displayFormat: types.string,
  minDate: types.string,
  maxDate: types.string,
  disabled: types.bool,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

DatepickerDefault.defaultProps = {
  className: null,
  readOnly: false,
  useTime: false,
  mode: Mode.DEFAULT,
  value: null,
  outFormat: 'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
  displayFormat: 'DD.MM.YYYY',
  minDate: null,
  maxDate: null,
  clearable: false,
  disabled: false,
};

export default DatepickerDefault;
