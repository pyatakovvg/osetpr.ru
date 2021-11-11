
import moment from '@packages/moment';
import { UUID } from '@ui.packages/utils';

import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:00.000000Z';


class Day {
  #_instance = null;
  #_id = null;
  #_value = null;
  #_isToday = false;
  #_isWeekend = false;
  #_isDisabled = false;

  constructor(instance, value) {
    this.#_instance = moment(instance).date(value);

    this.#_id = UUID();
    this.#_value = value;

    if (value) {
      this.#_isWeekend = this.#_instance.day() % 6 === 0;
      this.#_isToday = moment(this.#_instance.format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'));
      this.#_isDisabled = moment(this.#_instance.format('YYYY-MM-DD')).isBefore(moment().format('YYYY-MM-DD'));
    }
  }

  get() {
    return {
      id: this.#_id,
      value: this.#_value,
      isToday: this.#_isToday,
      isWeekend: this.#_isWeekend,
      isDisabled: this.#_isDisabled,
    };
  }

  set(value) {
    this.#_value = value;
  }
}

class Week {
  #_instance = null;
  #_days = [];

  constructor(instance) {
    this.#_instance = moment(instance);
  }

  get() {
    return this.#_days;
  }

  set(days) {
    this.#_days = days;
  }

  add(number) {
    this.#_days.push(new Day(this.#_instance, number));
  }
}

class Month {
  #_instance = null;
  #_id = null;
  #_name = null;
  #_number = null;
  #_weeks = [];

  constructor(month) {
    this.#_instance = moment({ month });
    this.#_number = month;

    const lastDay = this.#_instance.endOf('month').date();
    const lastDayOfMonth = this.#_instance.endOf('month').day();
    const firstDayOfMonth = this.#_instance.startOf('month').day() - 1;

    let daysInWeek = [];

    if (firstDayOfMonth > 0) {
      daysInWeek = [ ... new Array(firstDayOfMonth).fill(null) ];
    }
    for (let i = 1; i <= lastDay; i++) {
      daysInWeek.push(i);
    }
    if (lastDayOfMonth !== 0) {
      daysInWeek = [ ...daysInWeek, ... new Array(7 - lastDayOfMonth).fill(null) ];
    }

    this.#_id = UUID();
    this.#_name = months[this.#_instance.month()];
    this.#_weeks = this.reduceToArray(daysInWeek);
  }

  reduceToArray(items, SIZE = 7) {
    return items.reduce((p, c) => {
      if( p[p.length - 1].get().length === SIZE) {
        p.push(new Week(this.#_instance));
      }
      p[p.length - 1].add(c);
      return p;
    }, [new Week(this.#_instance)]);
  };

  getWeeks() {
    return this.#_weeks;
  }

  addWeek() {
    this.#_weeks.push(new Week(this.#_instance));
  }

  get() {
    return {
      name: this.#_name,
      number: this.#_number,
    };
  }
}


function Datepicker({ value, onChange }) {
  let instance = moment(value || undefined);
  if ( ! value) {
    instance = instance.add(2, 'hours');
  }

  function handleNextMonth() {
    const month = moment(value || undefined).month();
    const time = moment(value || undefined).month(month + 1);
    onChange(time.format(TIME_FORMAT));
  }

  function handlePrevMonth() {
    const month = moment(value || undefined).month();
    const time = moment(value || undefined).month(month - 1);
    onChange(time.format(TIME_FORMAT));
  }

  function handleChangeDate(data) {
    const time = instance.date(data['date']).month(data['month']);
    onChange(time.format(TIME_FORMAT));
  }

  const month = useMemo(() => new Month(instance.month()), [value]);
  const weeks = month.getWeeks();

  return (
    <div className={styles['wrapper']}>
      <div className={styles['month']}>
        <span className={cn(styles['icon'], 'fas fa-chevron-left')} onClick={handlePrevMonth} />
        <div className={styles['header']}>
          { month.get()['name'] } { instance.year() }
        </div>
        <span className={cn(styles['icon'], 'fas fa-chevron-right')} onClick={handleNextMonth} />
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
            {week.get().map((day) => {
              const dayValue = day.get();
              return (
                <div key={dayValue['id']} className={styles['day-number']}>
                  {dayValue['value']
                    ? (
                      <div
                        className={cn(styles['number'], {
                          [styles['to-day']]: dayValue['isToday'],
                          [styles['weekend']]: dayValue['isWeekend'],
                          [styles['disabled']]: dayValue['isDisabled'],
                          [styles['active']]: moment(instance.format('YYYY-MM-DD')).isSame(moment({ date: dayValue['value'], month: month.get()['number'] }).format('YYYY-MM-DD')),
                        })}
                        onClick={() => ! dayValue['isDisabled'] && handleChangeDate({
                          date: dayValue['value'],
                          month: month.get()['number'],
                        })}
                      >{ dayValue['value'] }</div>
                    )
                    : null}
                </div>
              );
            })}
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
