
import types from 'prop-types';
import React, { useEffect, useRef, useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Input({ mode, label, name, value, readOnly, require, onChange, onFocus, onBlur, ...props }) {
  const [isFocus, setFocus] = useState(false);

  const hiddenRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const hiddenElement = hiddenRef['current'];
    const textareaElement = textareaRef['current'];

    if ( ! hiddenElement || ! textareaElement) {
      return void 0;
    }

    const hiddenRECT = hiddenElement.getBoundingClientRect();
    textareaElement.style.height = hiddenRECT['height'] + 8 + 'px';
  }, [value]);

  const titleClassName = useMemo(() => cn(styles['title'], {
    [styles['is-focus']]: value || isFocus,
    [styles['require']]: require,
  }), [mode, isFocus]);
  const contentClassName = useMemo(() => cn(styles['content'], {
    [styles['mode--success']]: mode === 'success',
  }), [mode]);
  const elementClassName = useMemo(() => cn(styles['element'], {

  }), [mode]);

  function handleFocus(event) {
    setFocus(true);
    onFocus(event);
  }

  function handleChange(event) {
    const value = event['target']['value'];
    setFocus(true);
    onChange(value.replace(/\n/ig, '<br/>'));
  }

  function handleBlur(event) {
    const value = event['target']['value'];
    setFocus(false);
    onBlur(value.replace(/\n/ig, '<br/>'));
  }

  return (
    <div className={styles['wrapper']}>
      <span className={titleClassName}>{ label }</span>
      <div className={contentClassName}>
        <div ref={hiddenRef} className={styles['hidden']} dangerouslySetInnerHTML={{ __html: value }} />
        <textarea
          ref={textareaRef}
          className={elementClassName}
          name={name}
          value={value.replace(/<br\/>/ig, '\n')}
          {...props}
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  require: types.bool,
  readOnly: types.bool,
  mode: types.oneOf(['danger', 'default']),
};

Input.defaultType = {
  require: false,
  readOnly: false,
  mode: 'default',
};

Input.mode = {
  danger: 'danger',
}

export default Input;
