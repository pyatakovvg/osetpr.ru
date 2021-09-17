
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import types from 'prop-types';

import Control from './Control';
import Options from './Options';

import Context from './Context';

import styles from './default.module.scss';


function useIsOptionObject(options) {
  if (options[0]) {
    if (options[0] instanceof Object) {
      return true;
    }
  }
  return false;
}

function useFindSelectedValue(value, options, optionKey) {
  if (value instanceof Object) {
    return options.find(option => option[optionKey] === value[optionKey]);
  }

  const isOptionObject = useIsOptionObject(options);

  if (isOptionObject) {
    return options.find(option => {
      return option[optionKey] === value
    });
  }
  return options.find(option => option === value);
}

function useGetValue(value, options, optionKey, optionValue) {
  const selectedValue = useFindSelectedValue(value, options, optionKey);
  if (selectedValue instanceof Object) {
    return selectedValue[optionValue];
  }
  return value;
}

function Select({
  clearable,
  simple,
  disabled,
  options,
  value,
  mode,
  placeholder,
  optionKey,
  optionValue,
  inProcess,
  OptionTemplate,
  transformValue,
  onChange,
  onBlur,
  onTransformSelectedValue,
}) {
  const wrapperRef = useRef(null);
  const optionsRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(function changeValue() {
    setSelectedValue(useGetValue(value, options, optionKey, optionValue));
  }, [value, options]);

  useEffect(function clickEvents() {
    function handleClick(event) {
      event.stopPropagation();

      if ( ! isOpen) {
        return null;
      }

      const { current: wrapperElement } = wrapperRef;
      const portalElement = document.querySelector('#selectOptionsPortal');
      const { current: optionsElement } = optionsRef;

      if (optionsElement && ! optionsElement.contains(event['target'])) {
        handleClose();
      }

      if (portalElement && ! portalElement.contains(event['target']) && ! portalElement.contains(wrapperElement)) {
        handleClose();
      }
    }

    function handleScroll() {
      if ( ! isOpen) {
        return;
      }
      handleClose();
    }

    document.addEventListener('click', handleClick);
    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').addEventListener('scroll', handleScroll);
    }
    return function() {
      document.removeEventListener('click', handleClick);
      if (document.querySelector('#scroller')) {
        document.querySelector('#scroller').removeEventListener('scroll', handleScroll);
      }
    };
  });

  useLayoutEffect(function openSelect() {
    if (isOpen) {
      calculatePositionOptions();
    }
  }, [value, options, isOpen]);

  function calculatePositionOptions() {
    const { current: wrapperElement } = wrapperRef;
    const { current: optionsElement } = optionsRef;

    const wrapperRect = wrapperElement.getBoundingClientRect();

    optionsElement.style.left = wrapperRect['left'] + 'px';
    optionsElement.style.top = wrapperRect['bottom'] + 'px';
    optionsElement.style.width = wrapperRect['width'] + 'px';
  }

  function handleClose() {
    setOpen(false);
    onBlur && onBlur();
  }

  function handleControlClick() {
    setOpen( ! isOpen);
  }

  function handleResetClick() {
    onChange(null);
    handleClose();
  }

  function handleSelectValue(option) {
    if (option instanceof Object) {
      onChange(simple ? option[optionKey] : option);
    }
    else {
      onChange(option);
    }
    handleClose();
  }

  return (
    <Context.Provider value={{
      clearable,
      simple,
      value,
      mode,
      isOpen,
      isDisabled: disabled || inProcess,
      selectedValue,
      optionValue,
      optionKey,
      OptionTemplate,
      options,
      inProcess,
      transformValue,
      selectedObject: useFindSelectedValue(value, options, optionKey),
      onTransformSelectedValue,
    }}>
      <div ref={wrapperRef} className={styles['wrapper']} role="options">
        <Control
          clearable={clearable}
          value={value}
          placeholder={placeholder}
          isDisabled={disabled || inProcess}
          onClick={handleControlClick}
          onReset={handleResetClick}
        />
        {isOpen && (
          <Options
            ref={optionsRef}
            options={options}
            optionKey={optionKey}
            optionValue={optionValue}
            value={value}
            onClick={handleSelectValue}
          />
        )}
      </div>
    </Context.Provider>
  );
}

Select.propTypes = {
  simple: types.bool,
  clearable: types.bool,
  optionKey: types.string,
  optionValue: types.string,
  placeholder: types.string,
  options: types.array,
  value: types.oneOfType([types.string, types.object, types.number]),
  disabled: types.bool,
  inProcess: types.bool,
  transformValue: types.func,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
  OptionTemplate: types.elementType,
  onTransformSelectedValue: types.func,
  onTransformOptionValue: types.func,
};

Select.defaultProps = {
  simple: true,
  clearable: true,
  optionKey: 'id',
  optionValue: 'value',
  placeholder: 'Выбери значение',
  disabled: false,
  value: null,
  options: [],
  inProcess: false,
  transformValue: null,
  OptionTemplate: null,
  onTransformSelectedValue: null,
  onTransformOptionValue: null,
};

export default Select;
