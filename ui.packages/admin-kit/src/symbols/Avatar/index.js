
import types from 'prop-types';
import React, { useState } from 'react';

import Image from '../Image';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Avatar({ className, mode, accept, disabled, onChange }) {
  const [file, setFile] = useState(null);

  function handleAddImages() {
    const inputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.accept = accept;
    inputElement.multiple = false;
    inputElement.classList.add(styles['input']);

    inputElement.onchange = function() {
      const fr = new FileReader();
      const file = inputElement['files'][0];

      fr.onload = (event) => {
        setFile(event['target']['result']);
        onChange(file);
        inputElement.remove();
      };
      fr.readAsDataURL(file);
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
      <div className={styles['container']}>
        {file
          ? <Image className={styles['image']} src={file} />
          : (
            <div className={styles['placeholder']}>
              <span className={cn(styles['logo'], 'far fa-smile')} />
            </div>
          )
        }
      </div>
      <div className={styles['add']}>
        <i className="fas fa-camera-retro" />
      </div>
    </div>
  );
}

export default Avatar;
