
import React, { useMemo } from 'react';

import cn from "classnames";
import styles from './default.module.scss';

import moment from "moment";


export const dayOfWeekNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


function getMonthDays(value) {
  const lastDay = value.endOf('month').date();

  const weekDayOfLastDayOfMonth = value.endOf('month').day();
  const weekDayOfFirstDayOfMonth = value.startOf('month').day();

  const squares = [];

  if (weekDayOfFirstDayOfMonth !== 0) {
    for(let  i = 1; i < weekDayOfFirstDayOfMonth; i++) {
      squares.push(null);
    }
  } else {
    for(let i = 0; i < 6; i++) {
      squares.push(null);
    }
  }

  for(let i = 1; i <= lastDay; i++) {
    squares.push(i);
  }

  if (weekDayOfLastDayOfMonth !== 0) {
    for(let i = weekDayOfLastDayOfMonth; i < 7; i++) {
      squares.push(null);
    }
  }

  return squares;
}

function Day({ date, year, month, number, onClick }) {
  const wrapperClassName = cn(styles['day'], {
    [styles['empty']]: ! number,
    [styles['active']]: date && date === number,
    [styles['today']]: moment({ date: number, year, month }).isSame(moment(), 'date'),
  });

  function handleChange() {
    if ( ! number) {
      return void 0;
    }
    onClick();
  }

  return (
    <div className={wrapperClassName} onClick={handleChange}>
      <div className={styles['container']}>
        <div className={styles['number']}>{ number }</div>
      </div>
    </div>
  );
}

function DayOfMonth({ day }) {
  return (
    <div className={styles['week']}>
      <div className={styles['name']}>{ day }</div>
    </div>
  );
}

function Days({ date, month, year, value, onChange }) {
  const days = useMemo(() => getMonthDays(value), [value]);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['days-of-month']}>
        {dayOfWeekNames.map((day, index) => (
          <DayOfMonth key={index} day={day} />
        ))}
      </div>
      <div className={styles['days']}>
        {days.map((number, index) => (
          <Day
            date={date}
            month={month}
            year={year}
            key={index}
            number={number}
            onClick={() => onChange(number)}
          />
        ))}
      </div>
    </div>
  );
}

export default Days;
