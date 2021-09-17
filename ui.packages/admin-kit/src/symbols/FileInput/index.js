
import types from 'prop-types';
import React, { useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function FileInput({ className, disabled, mode, onChange }) {
  const [file, setFile] = useState(null);

  function handleAddImages() {
    const inputElement = document.createElement('input');

    inputElement.classList.add(styles['input']);
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.accept = '.jpg, .jpeg, .bmp, .png';

    inputElement.onchange = () => {
      const file = inputElement['files'][0];

      setFile(file);
      onChange(file);
      inputElement.remove();
    };

    inputElement.click();
  }

  function handleFocus(event) {
    event.stopPropagation();
    handleAddImages();
  }

  const classNameInputContainer = cn(className, styles['wrapper'], {
    [styles['container--primary']]: mode === PRIMARY_MODE,
    [styles['container--success']]: mode === SUCCESS_MODE,
    [styles['container--info']]: mode === INFO_MODE,
    [styles['container--danger']]: mode === DANGER_MODE,
    [styles['container--warning']]: mode === WARNING_MODE,
    [styles['container--disabled']]: disabled,
  });

  return (
    <div className={classNameInputContainer} onClick={handleFocus}>
      <span className={styles['container']}>
        {file
        ? (
            <span className={styles['file-name']}>{ file['name'] }</span>
          )
        : (
            <span className={styles['placeholder']}>Выбрать файл</span>
          )
        }
      </span>
      <span className={styles['button']}>
        <span className={styles['button__caption']}>Выбрать</span>
      </span>
    </div>
  );
}

FileInput.propTypes = {
  className: types.string,
  type: types.oneOf(['text', 'password']),
  format: types.oneOf(['string', 'number']),
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  value: types.any,
  disabled: types.bool,
  onChange: types.func,
};

FileInput.defaultProps = {
  className: '',
  type: 'text',
  format: 'string',
  mode: 'default',
  value: '',
  disabled: false,
};

export default FileInput;
