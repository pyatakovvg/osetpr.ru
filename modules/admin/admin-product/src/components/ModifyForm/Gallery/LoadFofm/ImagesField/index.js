
import { Size } from '@ui.packages/types';
import { Button, Image } from '@ui.packages/admin-kit';

import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function ImageView({ src, onRemove }) {
  function handleDestroyClick() {
    onRemove();
  }

  return (
    <div className={styles['image']}>
      <span className={cn(styles['destroy'], 'fas fa-times')} onClick={handleDestroyClick} />
      <Image src={src} />
    </div>
  );
}

export default function ImageField({ input }) {
  function handleAddImages() {
    const inputElement = document.createElement('input');

    inputElement.classList.add(styles['input']);
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.accept = '.jpg, .jpeg, .bmp, .png';

    inputElement.onchange = () => {
      input.onChange([...input['value'] || [], ...inputElement['files']]);
      inputElement.remove();
    };

    inputElement.click();
  }

  function handleRemove(index) {
    input.onChange([
      ...(input['value'] || []).splice(0, index),
      ...(input['value'] || []).splice(index + 1)
    ]);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
          size={Size.SMALL}
          form={Button.FORM_CREATE}
          onClick={handleAddImages}
        >Загрузить</Button>
      </div>
      <div className={styles['content']}>
        {(input['value'] || []).map((file, index) => (
          <div className={styles['section']}>
            <ImageView key={index['name'] + index} index={index} src={URL.createObjectURL(file)} onRemove={() => handleRemove(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
