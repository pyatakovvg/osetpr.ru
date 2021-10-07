
import React, { useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Years({ year, onChange }) {
  const [newYear, setYear] = useState(year);

  function handleStopEvents(event) {
    event.stopPropagation();
  }

  function handleClose() {
    onChange(year);
  }

  function handleChange() {
    onChange(newYear);
  }

  let count = 0;
  function handleWheel(event) {
    if (count > 4) {
      if (event.deltaY > 0) {
        setYear(newYear + 1);
      }
      else if (event.deltaY < 0) {
        setYear(newYear - 1);
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
        <div className={styles['next']} onClick={() => setYear(newYear + 1)}>
          <span className={cn(styles['icon'], 'fas fa-chevron-up')} />
        </div>
        <div className={styles['value']} onClick={() => handleChange()}>
          { newYear }
        </div>
        <div className={styles['prev']} onClick={() => setYear(newYear - 1)}>
          <span className={cn(styles['icon'], 'fas fa-chevron-down')} />
        </div>
      </div>
    </div>
  );
}

export default Years;
