
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
  return value.map((item) => {
    const selectedValue = useFindSelectedValue(item, options, optionKey);
    if (selectedValue instanceof Object) {
      return selectedValue[optionValue];
    }
    return item;
  });
}

function Select({
  simple,
  disabled,
  options,
  value,
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
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(function changeValue() {
    setSelectedValue(useGetValue(value, options, optionKey, optionValue));
  }, [value, options]);

  useEffect(function clickEvents() {
    function handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      if (isOpen) {
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
    }

    document.addEventListener('click', handleClick);
    document.querySelector('#root').addEventListener('scroll', handleClose);
    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').addEventListener('scroll', handleClose);
    }
    return function() {
      document.removeEventListener('click', handleClick);
      document.querySelector('#root').removeEventListener('scroll', handleClose);
      if (document.querySelector('#scroller')) {
        document.querySelector('#scroller').removeEventListener('scroll', handleClose);
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
    onBlur();
  }

  function handleControlClick() {
    setOpen( ! isOpen);
  }

  function handleResetClick() {
    onChange(null);
    handleClose();
  }

  function handleSelectValue(options) {
    onChange(options);
  }

  return (
    <Context.Provider value={{
      simple,
      value,
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
      <div ref={wrapperRef} className={styles['wrapper']}>
        <Control
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
            onReset={handleResetClick}
            onApply={handleClose}
          />
        )}
      </div>
    </Context.Provider>
  );
}

Select.propTypes = {
  simple: types.bool,
  optionKey: types.string,
  optionValue: types.string,
  placeholder: types.string,
  options: types.array,
  value: types.array,
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
  optionKey: 'id',
  optionValue: 'value',
  placeholder: 'Выбери значение',
  disabled: false,
  value: [],
  options: [],
  inProcess: false,
  transformValue: null,
  OptionTemplate: null,
  onTransformSelectedValue: null,
  onTransformOptionValue: null,
};

export default Select;
