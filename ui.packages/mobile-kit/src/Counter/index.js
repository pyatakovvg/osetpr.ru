
import types from 'prop-types';
import React, { useState } from 'react';

import styles from './default.module.scss';


export default function Button({ number, onClick }) {
  const [count, setCount] = useState(number);

  function handlePlus() {
    const nextNumber = count + 1;
    if (nextNumber > 10) {
      return void 0;
    }
    setCount(nextNumber);
    onClick(nextNumber);
  }

  function handleMinus() {
    const prevNumber = count - 1;
    if (prevNumber < 1) {
      return void 0;
    }
    setCount(prevNumber);
    onClick(prevNumber);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['button']} onClick={() => handleMinus()}>-</div>
      <div className={styles['number']}>
        <span>{ count }</span>
      </div>
      <div className={styles['button']} onClick={() => handlePlus()}>+</div>
    </div>
  );
}

Button.propTypes = {
  number: types.number,
};

Button.defaultType = {
  number: 0,
};
