
import moment from '@packages/moment';

import types from 'prop-types';
import React, { useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const TIME_FORMAT = 'YYYY-MM-DD HH:mm:00.000000Z';


function Time({ value, onChange }) {
  let instance = moment(value || undefined);

  const hours = useMemo(() => instance.format('HH'), [value]);
  const minutes = useMemo(() => instance.format('mm'), [value]);

  const [hourValue, setHourValue] = useState(hours);
  const [minuteValue, setMinuteValue] = useState(minutes);
  const [isHoursFocus, setHoursFocus] = useState(false);
  const [isMinutesFocus, setMinutesFocus] = useState(false);

  function handleHoursChange(event) {
    const hours = event['target']['value'];
    if (hours === '') {
      setHourValue('');
    }
    else if (/^\d{1,2}$/.test(hours)) {
      if (/^[0-1][0-9]?|[2][0-3]?$/.test(hours)) {
        setHourValue(hours);
      }
    }
  }

  function handleHoursFocus() {
    setHoursFocus(true);
  }

  function handleHoursBlur(event) {
    const hours = Number(event['target']['value']);
    const time = moment(value || undefined).hour(hours);
    setHoursFocus(false);
    onChange(time.format(TIME_FORMAT));
  }

  function handleMinutesChange(event) {
    const minutes = event['target']['value'];
    if (minutes === '') {
      setMinuteValue('');
    }
    else if (/^\d{1,2}$/.test(minutes)) {
      if (/^[0-5][0-9]?$/.test(minutes)) {
        setMinuteValue(minutes);
      }
    }
  }

  function handleMinutesFocus() {
    setMinutesFocus(true);
  }

  function handleMinutesBlur(event) {
    const minutes = Number(event['target']['value']);
    const time = moment(value || undefined).minute(minutes);
    setMinutesFocus(false);
    onChange(time.format(TIME_FORMAT));
  }

  const timeHoursClassName = cn(styles['time'], {
    [styles['in-focus']]: isHoursFocus,
    // [styles['is-error']]: isHoursError,
  });
  const timeMinutesClassName = cn(styles['time'], {
    [styles['in-focus']]: isMinutesFocus,
    // [styles['is-error']]: isMinutesError,
  });

  return (
    <div className={styles['wrapper']}>
      <div className={timeHoursClassName}>
        <div className={styles['number']}>
          <input
            className={styles['input']}
            type={'number'}
            value={hourValue}
            onChange={handleHoursChange}
            onFocus={handleHoursFocus}
            onBlur={handleHoursBlur}
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
            value={minuteValue}
            onChange={handleMinutesChange}
            onFocus={handleMinutesFocus}
            onBlur={handleMinutesBlur}
          />
        </div>
        <div className={styles['title']}>минуты</div>
      </div>
    </div>
  );
}

Time.propTypes = {
  mode: types.oneOf(['danger', 'default']),
  value: types.oneOfType([types.string, types.object]),
};

Time.defaultType = {
  mode: 'default',
  value: undefined,
};

export default Time;
