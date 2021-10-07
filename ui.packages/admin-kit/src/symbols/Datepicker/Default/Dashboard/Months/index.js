
import React, { useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


function Months({ month, onChange }) {
  const [newMonth, setMonth] = useState(month);

  function handleStopEvents(event) {
    event.stopPropagation();
  }

  function handleClose() {
    onChange(month);
  }

  function handleChange() {
    onChange(newMonth);
  }

  function handleNextMonth() {
    const nextMonth = newMonth + 1;

    if (nextMonth > 11) {
      setMonth(0);
    }
    else {
      setMonth(nextMonth);
    }
  }

  function handlePrevMonth() {
    const prevMonth = newMonth - 1;

    if (prevMonth < 0) {
      setMonth(11);
    }
    else {
      setMonth(prevMonth);
    }
  }

  let count = 0;
  function handleWheel(event) {
    if (count > 4) {
      if (event.deltaY > 0) {
        handleNextMonth();
      }
      else if (event.deltaY < 0) {
        handlePrevMonth();
      }
      count = 0;
    }
    else {
      count++;
    }
  }

  return (
    <div className={styles['wrapper']} onClick={handleStopEvents} onWheel={handleWheel}>
      <span className={cn(styles['close'], 'fas fa-times')} onClick={handleClose} />
      <div className={styles['content']}>
        <div className={styles['next']} onClick={() => handleNextMonth()}>
          <span className={cn(styles['icon'], 'fas fa-chevron-up')} />
        </div>
        <div className={styles['value']} onClick={() => handleChange()}>
          { monthNames[newMonth] }
        </div>
        <div className={styles['prev']} onClick={() => handlePrevMonth()}>
          <span className={cn(styles['icon'], 'fas fa-chevron-down')} />
        </div>
      </div>
    </div>
  );
}

export default Months;
