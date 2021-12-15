
import moment from 'moment';
import React, { useState } from 'react';

import styles from './default.module.scss';
import cn from "classnames";


function Number({ label, value, onPrev, onNext }) {
  return (
    <div className={styles['number']}>
      <div className={styles['label']}>{ label }</div>
      <div className={styles['control']}>
        <div className={styles['next']} onClick={onNext}>
          <span className={cn(styles['icon'], 'fas fa-chevron-up')} />
        </div>
        <div className={styles['value']}>
          { moment({ minute: value }).format('mm') }
        </div>
        <div className={styles['prev']} onClick={onPrev}>
          <span className={cn(styles['icon'], 'fas fa-chevron-down')} />
        </div>
      </div>
    </div>
  );
}


function Times({ hour, minute, onChange }) {
  const [newHour, setHour] = useState(hour);
  const [newMinute, setMinute] = useState(minute);

  function handleStopEvents(event) {
    event.stopPropagation();
  }

  function handleClose() {
    onChange({ hour, minute });
  }

  function handleChange() {
    onChange({ hour: newHour, minute: newMinute });
  }

  function handleNextHour() {
    const nextHour = newHour + 1;
    if (nextHour > 23) {
      setHour(0);
    }
    else {
      setHour(nextHour);
    }
  }

  function handlePrevHour() {
    const prevHour = newHour - 1;
    if (prevHour < 0) {
      setHour(23);
    }
    else {
      setHour(prevHour);
    }
  }

  function handleNextMinute() {
    const nextMinute = newMinute + 1;
    if (nextMinute > 59) {
      setMinute(0);
    }
    else {
      setMinute(nextMinute);
    }
  }

  function handlePrevMinute() {
    const prevMinute = newMinute - 1;
    if (prevMinute < 0) {
      setMinute(59);
    }
    else {
      setMinute(prevMinute);
    }
  }

  let countHour = 0;
  function handleWheelHour(event) {
    if (countHour > 4) {
      if (event.deltaY > 0) {
        handleNextHour()
      }
      else if (event.deltaY < 0) {
        handlePrevHour();
      }
      countHour = 0;
    }
    else {
      countHour++;
    }
  }

  let countMinute = 0;
  function handleWheelMinute(event) {
    if (countMinute > 4) {
      if (event.deltaY > 0) {
        handleNextMinute();
      }
      else if (event.deltaY < 0) {
        handlePrevMinute();
      }
      countMinute = 0;
    }
    else {
      countMinute++;
    }
  }

  return (
    <div className={styles['wrapper']} onClick={handleStopEvents}>
      <span className={cn(styles['close'], 'fas fa-times')} onClick={handleClose} />
      <div className={styles['content']}>
        <div className={styles['hour']} onWheel={handleWheelHour}>
          <Number label={'Часы'} value={newHour} onNext={handleNextHour} onPrev={handlePrevHour} />
        </div>
        <div className={styles['minute']} onWheel={handleWheelMinute}>
          <Number label={'Минуты'} value={newMinute} onNext={handleNextMinute} onPrev={handlePrevMinute} />
        </div>
      </div>
      <span className={styles['apply']} onClick={() => handleChange()}>Установить</span>
    </div>
  );
}

export default Times;
