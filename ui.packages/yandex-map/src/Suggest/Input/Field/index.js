
import { Input } from '@ui.packages/kit';

import React from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Field({ label, require, disabled, meta: { error, touched }, input }) {
  const hasError = ! disabled && error && touched;

  return (
    <div className={cn(styles['wrapper'], {
      [styles['disabled']]: hasError,
    })}>
      {label && (
        <p className={cn(styles['label'], { [styles['require']]: require })}>{ label }</p>
      )}
      <div className={styles['content']}>
        <Input mode={hasError ? 'danger' : 'default'} {...input} />
        {hasError && (
          <span className={styles['error']}>
            <span className={styles['error__message']}>{ error }</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Field;
