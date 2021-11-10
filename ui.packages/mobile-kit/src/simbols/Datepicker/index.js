
import moment from '@packages/moment';

import types from 'prop-types';
import React, { useMemo, useState } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:00.000000Z';

const reduceToArray = (items, SIZE = 4) => {
  return items.reduce((p, c) => {
    if( p[p.length - 1].length === SIZE) {
      p.push([]);
    }
    p[p.length - 1].push(c);
    return p;
  }, [[]]);
};


function Datepicker({ name, value, onChange }) {
  const instance = moment(value || undefined);

  const [date, setDate] = useState(instance.date());

  const weeks = useMemo(() => {
    const lastDay = instance.endOf('month').date();

    const weekDayOfLastDayOfMonth = instance.endOf('month').day();
    const weekDayOfFirstDayOfMonth = instance.startOf('month').day();

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

    return reduceToArray(squares, 7);
  }, [value]);

  function handleChangeDate(number) {
    console.log(number)
    setDate(number);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['month']}>
        <span className={cn(styles['icon'], 'fas fa-chevron-left')} />
        <div className={styles['header']}>
          { months[instance.month()] }
        </div>
        <span className={cn(styles['icon'], 'fas fa-chevron-right')} />
      </div>
      <div className={styles['days']}>
        {days.map((name, index) => (
          <div key={index} className={cn(styles['day-name'], {
            [styles['weekend']]: index > 4
          })}>{ name }</div>
        ))}
      </div>
      <div className={styles['numbers']}>
        {weeks.map((week, index) => (
          <div key={index} className={styles['week']}>
            {week.map((number, key) => (
              <div key={index + key} className={styles['day-number']}>
                {number
                  ? <div className={cn(styles['number'], {
                    [styles['weekend']]: key > 4,
                    [styles['to-day']]: moment().date() === number,
                    [styles['active']]: date === number,
                  })} onClick={() => handleChangeDate(number)}>{ number }</div>
                  : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Datepicker.propTypes = {
  mode: types.oneOf(['danger', 'default']),
  value: types.string,
};

Datepicker.defaultType = {
  mode: 'default',
  value: undefined,
};

export default Datepicker;
