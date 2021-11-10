
import moment from '@packages/moment';

import types from 'prop-types';
import React, { useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const TIME_FORMAT = 'YYYY-MM-DD HH:mm:00.000000Z';


function Time({ name, value, onChange }) {
  const [isHoursFocus, setHoursFocus] = useState(false);
  const [isMinutesFocus, setMinutesFocus] = useState(false);

  const hour = useMemo(() => moment(value || undefined).format('HH'), [value]);
  const minute = useMemo(() => moment(value || undefined).format('mm'), [value]);

  function handleHoursFocusState(value) {
    setHoursFocus(value);
  }

  function handleMinutesFocusState(value) {
    setMinutesFocus(value);
  }

  function handleHour(event) {
    let hour = Number(event.target.value);
    const time = moment(value || undefined).hour(hour);
    onChange(time.format(TIME_FORMAT));
  }

  function handleMinutes(event) {
    let minutes = Number(event.target.value);
    const time = moment(value || undefined).minute(minutes);
    onChange(time.format(TIME_FORMAT));
  }

  const timeHoursClassName = cn(styles['time'], {
    [styles['in-focus']]: isHoursFocus,
  });
  const timeMinutesClassName = cn(styles['time'], {
    [styles['in-focus']]: isMinutesFocus,
  });

  return (
    <div className={styles['wrapper']}>
      <div className={timeHoursClassName}>
        <div className={styles['number']}>
          <input
            className={styles['input']}
            type={'number'}
            max={24}
            min={-1}
            value={hour}
            onChange={handleHour}
            onFocus={() => handleHoursFocusState(true)}
            onBlur={() => handleHoursFocusState(false)}
          />
        </div>
        <div className={styles['title']}>часы</div>
      </div>
      <span className={styles['delimiter']}>:</span>
      <div className={timeMinutesClassName}>
        <div className={styles['number']}>
          <input
            className={styles['input']}
            type={'number'}
            max={60}
            min={-1}
            value={minute}
            onChange={handleMinutes}
            onFocus={() => handleMinutesFocusState(true)}
            onBlur={() => handleMinutesFocusState(false)}
          />
        </div>
        <div className={styles['title']}>минуты</div>
      </div>
    </div>
  );
}

Time.propTypes = {
  mode: types.oneOf(['danger', 'default']),
  value: types.string,
};

Time.defaultType = {
  mode: 'default',
  value: undefined,
};

export default Time;
