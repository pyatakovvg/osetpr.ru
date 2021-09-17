
import moment from '@packages/moment';

import types from 'prop-types';
import React, { useRef, forwardRef, useState, useEffect, useLayoutEffect } from 'react';

import Dashboard from './Dashboard';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


const DatePickerBoard = forwardRef((props, ref) => {
  const { value, maxDate, minDate, onChange } = props;
  return (
    <div ref={ref} className={styles['dates']}>
      <div className={styles['dates__content']}>
        <Dashboard value={value} maxDate={maxDate} minDate={minDate} onChange={onChange} />
      </div>
    </div>
  );
});


function DatePicker({ className, mode, disabled, value, minDate, maxDate, clearable, format, displayFormat, onBlur, onChange, onFocus }) {
  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  const [isDirectUp, setDirectUp] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isFocus, setFocus] = useState(false);

  function handleSetFocus() {
    onFocus();
  }

  function handleOnFocus() {
    if ( ! isFocus) {
      setOpen(true);
      setFocus(true);
      handleSetFocus();
    }
  }

  function handleOnBlur() {
    setOpen(false);
    setDirectUp(false);
    setFocus(false);
    onBlur();
  }

  function handleOnChange(value) {
    setOpen(false);
    setDirectUp(false);
    setFocus(false);
    onChange(value.format(format));
  }

  function handleResetValue() {
    setOpen(false);
    setDirectUp(false);
    setFocus(false);
    onChange('');
  }

  useEffect(() => {
    function eventReset(event) {
      event.stopPropagation();
console.log(23123, isOpen)
      if (isOpen) {
        const { current: wrapperElement } = selectRef;
        const portalElement = document.body; //document.querySelector('#selectOptionsPortal');
        const { current: optionsElement } = optionsRef;

        if (optionsElement && ! optionsElement.contains(event['target'])) {
          // eventReset();
          eventHandleResize();
          console.log(123)
        }

        // if (portalElement && ! portalElement.contains(event['target']) && ! portalElement.contains(wrapperElement)) {
        //   // eventReset();
        //   eventHandleResize();
        // }
      }
      // const {current: selectElement} = selectRef;
      // const target = event.target;
      // if (selectElement && ! selectElement.contains(target)) {
      //   isOpen && handleOnBlur();
      // }
    }

    function eventHandleResize() {
      if (isOpen) {
        handleOnBlur();
      }
    }

    function eventHandleScrolling() {
      if (isOpen) {
        handleOnBlur();
      }
    }

    document.addEventListener('click', eventReset);
    window.addEventListener('resize', eventHandleResize);
    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').addEventListener('scroll', eventHandleScrolling);
    }
    return () => {

      document.removeEventListener('click', eventReset);
      window.removeEventListener('resize', eventHandleResize);
      if (document.querySelector('#scroller')) {
        document.querySelector('#scroller').removeEventListener('scroll', eventHandleScrolling);
      }
    };
  }, []);

  useLayoutEffect(() => {
    calculateDirection();
  }, [isOpen]);

  function calculateDirection() {
    const { current: selectElement } = selectRef;
    const { current: optionsElement } = optionsRef;

    if ( ! selectElement || ! optionsElement) {
      return;
    }

    const selectRECT = selectElement.getBoundingClientRect();
    const optionsRECT = optionsElement.getBoundingClientRect();
    const viewportRECT = document.body.getBoundingClientRect();

    if ( ! isDirectUp && optionsRECT['bottom'] + 20 >= viewportRECT['bottom']) {
      if (optionsRECT['bottom'] + 50 >= viewportRECT['bottom']) {
        setDirectUp(true);
        optionsElement.style['top'] = 'auto';
        optionsElement.style['bottom'] = viewportRECT['bottom'] - selectRECT['top'] + 4 + 'px';
      }
    }

    if ( ! isDirectUp && optionsRECT['bottom'] + 20 <= viewportRECT['bottom']) {
      optionsElement.style['top'] = selectRECT['bottom'] + 'px';
    }
  }

  function renderValue(value) {
    const selectedValue = value ? moment(value).format(displayFormat) : null;// (value && this._getValue(value)) || null;

    return (
      <span className={styles['select__values']} onClick={handleOnFocus}>
        {selectedValue
          ? <span className={styles['select__value']}>{selectedValue}</span>
          : <span className={styles['select__placeholder']}>__.__.____</span>}
      </span>
    );
  }

  function renderCancel() {
    const classNameMarker = cn(styles['select__marker'], 'fas fa-times');
    return clearable && (
      <span className={styles['select__cross']} onClick={handleResetValue}>
        <span className={classNameMarker}/>
      </span>
    );
  }

  function renderMarker() {
    const classNameMarker = cn(styles['select__marker'], 'far fa-calendar-alt');
    return (
      <span className={styles['select__angle']} onClick={handleOnFocus}>
        <span className={classNameMarker} />
      </span>
    );
  }

  const classNameSelectWrapper = cn(className, styles['wrapper'], {
    [styles['wrapper--primary']]: mode === PRIMARY_MODE,
    [styles['wrapper--success']]: mode === SUCCESS_MODE,
    [styles['wrapper--info']]: mode === INFO_MODE,
    [styles['wrapper--danger']]: mode === DANGER_MODE,
    [styles['wrapper--warning']]: mode === WARNING_MODE,
    [styles['wrapper--disabled']]: disabled,
  });
  const classNameSelect = cn(styles['select'], {
    [styles['select--is-focus']]: isOpen,
  });

  return (
    <div className={classNameSelectWrapper}>
      <div ref={selectRef} className={classNameSelect}>
        <span className={styles['select__content']}>
          { renderValue(value) }
        </span>
        <span className={styles['select__controls']}>
          { !! value && renderCancel()}
          {renderMarker()}
        </span>
        {isOpen && (
          <DatePickerBoard
            ref={optionsRef}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleOnChange}
          />
        )}
      </div>
    </div>
  );
}

DatePicker.propTypes = {
  className: types.string,
  label: types.string,
  value: types.any,
  minDate: types.any,
  maxDate: types.any,
  displayFormat: types.string,
  format: types.string,
  message: types.string,
  mode: types.string,
  disabled: types.bool,
  scroller: types.string,
  clearable: types.bool,
  onChange: types.func,
  onFocus: types.func,
  onBlur: types.func,
};

DatePicker.defaultProps = {
  className: '',
  label: '',
  message: '',
  mode: 'default',
  disabled: false,
  value: null,
  minDate: null,
  maxDate: null,
  format: 'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
  displayFormat: 'DD.MM.YYYY',
  scroller: 'body',
  clearable: false,
};

export default DatePicker;
