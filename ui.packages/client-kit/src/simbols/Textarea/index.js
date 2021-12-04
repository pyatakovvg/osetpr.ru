
import types from 'prop-types';
import React, { useEffect, useRef, useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Textarea({ mode, label, name, value, readOnly, require, onChange, onFocus, onBlur, ...props }) {
  const [isFocus, setFocus] = useState(false);
  const textareaRef = useRef(null);

  const titleClassName = useMemo(() => cn(styles['title'], {
    [styles['is-focus']]: value || isFocus,
    [styles['require']]: require,
  }), [mode, isFocus]);
  const contentClassName = useMemo(() => cn(styles['content'], {
    [styles['mode--success']]: mode === 'success',
  }), [mode]);
  const elementClassName = useMemo(() => cn(styles['element'], {}), [mode]);

  useEffect(() => {
    const textareaElement = textareaRef['current'];

    if ( ! textareaElement) {
      return void 0;
    }

    function handleInput(event) {
      const target = event['target'];
      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 'px'
    }

    textareaElement.classList.add(styles['auto']);
    textareaElement.setAttribute('style', 'height: ' + textareaElement.scrollHeight + 'px');
    textareaElement.addEventListener('input', handleInput);

    return () => {
      textareaElement.removeEventListener('input', handleInput);
    };
  }, []);

  function handleFocus(event) {
    setFocus(true);
    onFocus(event);
  }

  function handleChange(event) {
    const value = event['target']['value'];
    setFocus(true);
    onChange(value);
  }

  function handleBlur(event) {
    const value = event['target']['value'];
    setFocus(false);
    onBlur(value);
  }

  return (
    <div className={styles['wrapper']}>
      <span className={titleClassName}>{ label }</span>
      <div className={contentClassName}>
        <textarea
          ref={textareaRef}
          className={elementClassName}
          name={name}
          value={value}
          {...props}
          rows={1}
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

Textarea.propTypes = {
  require: types.bool,
  readOnly: types.bool,
  mode: types.oneOf(['danger', 'default']),
};

Textarea.defaultType = {
  require: false,
  readOnly: false,
  mode: 'default',
};

Textarea.mode = {
  danger: 'danger',
}

export default Textarea;
