
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Counter({ number, disabled, onPlus, onMinus }) {
  function handlePlus(event) {
    event.preventDefault();
    if (disabled) {
      return void 0;
    }
    if (number < 10) {
      onPlus();
    }
  }

  function handleMinus(event) {
    event.preventDefault();
    if (disabled) {
      return void 0;
    }
    if (number > 1) {
      onMinus();
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={cn(styles['minus'], { [styles['disabled']]: disabled || (number <= 1) })} onClick={handleMinus}>
        <span className={cn(styles['icon'], 'fas fa-minus')} />
      </div>
      <div className={styles['quantity']}>
        { number }
      </div>
      <div className={cn(styles['plus'], { [styles['disabled']]: disabled || (number >= 10) })} onClick={handlePlus}>
        <span className={cn(styles['icon'], 'fas fa-plus')} />
      </div>
    </div>
  );
}

export default Counter;
