
import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';

import types from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import Input from '../Input';
import Suggestions from './Suggestions';

import cn from 'classnames';
import styles from './default.module.scss';


function setCursorToEnd(element) {
  if ( ! element) {
    return;
  }
  const valueLength = element.value.length;
  if (element.selectionStart || element.selectionStart === 0) {
    element.selectionStart = valueLength;
    element.selectionEnd = valueLength;
    element.focus();
  }
}

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(func.apply(this, args));
      }, timeout);
    });
  };
}

async function fetch(data) {
  return await request({
    url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    method: 'post',
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + process.env['REACT_APP_SUGGESTION_TOKEN'],
    },
    data: JSON.stringify({
      query: data,
      count: 5,
    }),
  });
}

const fetching = debounce(async function(params) {
  return await fetch(params);
});


function DaData({ className, disabled, mode, value, onFocus, onChange, onBlur }) {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const suggestionsRef = useRef(null);

  const [isFocus, setFocus] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(true);

  const classNameInputWrapper = cn(className, styles['wrapper'], {
    [styles['mode--info']]: mode === Mode.INFO,
    [styles['mode--danger']]: mode === Mode.DANGER,
    [styles['mode--warning']]: mode === Mode.DANGER,
    [styles['mode--primary']]: mode === Mode.PRIMARY,
    [styles['mode--success']]: mode === Mode.SUCCESS,
  }, {
    [styles['wrapper--disabled']]: disabled,
  });

  useEffect(async function() {
    const { suggestions } = await fetching(value);
    setSuggestions(suggestions);
  }, [value]);

  useEffect(function() {
    if (isFocus) {
      calculatePositionOptions();
    }
  }, [suggestions, isFocus]);

  useEffect(function clickEvents() {
    // function handleClick(event) {
    //   event.stopPropagation();
    //
    //   if (isFocus) {
    //     const { current: wrapperElement } = wrapperRef;
    //     const portalElement = document.querySelector('#selectOptionsPortal');
    //     const { current: optionsElement } = suggestionsRef;
    //
    //     if (optionsElement && ! optionsElement.contains(event['target'])) {
    //       handleClose();
    //     }
    //
    //     if (portalElement && ! portalElement.contains(event['target']) && ! portalElement.contains(wrapperElement)) {
    //       handleClose();
    //     }
    //   }
    // }

    // document.addEventListener('click', handleClick);
    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').addEventListener('scroll', calculatePositionOptions);
    }
    return function() {
      // document.removeEventListener('click', handleClick);
      if (document.querySelector('#scroller')) {
        document.querySelector('#scroller').removeEventListener('scroll', calculatePositionOptions);
      }
    };
  });

  // function handleClose() {
  //   setFocus(false);
  // }

  function calculatePositionOptions() {
    if ( ! isFocus) {
      return;
    }

    const { current: wrapperElement } = wrapperRef;
    const { current: optionsElement } = suggestionsRef;

    if ( ! wrapperElement || ! optionsElement) {
      return;
    }

    const wrapperRect = wrapperElement.getBoundingClientRect();

    optionsElement.style.left = wrapperRect['left'] + 'px';
    optionsElement.style.top = wrapperRect['bottom'] + 'px';
  }

  function handleInputChange(event) {
    const { value } = event['target'];
    setDisplaySuggestions(true);
    onChange(value);
  }

  function handleInputFocus() {
    setFocus(true);
    onFocus && onFocus();
  }

  function handleInputBlur() {
    onBlur && onBlur();
  }

  function handleSelect(value) {
    const { current: inputElement } = inputRef;
    setCursorToEnd(inputElement);
    setDisplaySuggestions(false);
    onChange && onChange(value);
  }

  return (
    <div ref={wrapperRef} className={classNameInputWrapper}>
      <div className={styles['container']}>
        <Input
          ref={inputRef}
          className={styles['input']}
          autoComplete="off"
          value={value}
          mode={mode}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <span className={cn(styles['icon'], 'fas fa-search-location')} />
      </div>
      {isFocus && displaySuggestions && !! suggestions.length && (
        <Suggestions ref={suggestionsRef} items={suggestions} onSelect={handleSelect} />
      )}
    </div>
  );
}

DaData.propTypes = {
  className: types.string,
  mode: types.oneOf([Mode.DEFAULT, Mode.DANGER, Mode.INFO, Mode.SUCCESS, Mode.PRIMARY, Mode.WARNING]),
  value: types.string,
  disabled: types.bool,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

DaData.defaultProps = {
  className: '',
  mode: Mode.DEFAULT,
  value: '',
  disabled: false,
};

export default DaData;
