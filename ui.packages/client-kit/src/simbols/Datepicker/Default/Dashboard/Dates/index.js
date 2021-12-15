
import React from 'react';
import moment from 'moment';

import Header from './Header';
import Days from './Days';

import styles from './default.module.scss';


function Dates({ useTime, date, month, year, hour, minute, minDate, maxDate, onPrev, onNext, onChange, onYearModify, onMonthModify, onTimeModify }) {
  function handleChangeDay(number) {
    onChange(number);
  }

  function handleStopClickEvent(event) {
    event.stopPropagation();
  }

  return (
    <div className={styles['wrapper']} onClick={handleStopClickEvent}>
      <div className={styles['header']}>
        <Header
          year={year}
          month={month}
          onPrev={() => onPrev()}
          onNext={() => onNext()}
          onChangeMonth={onMonthModify}
          onChangeYear={onYearModify}
        />
      </div>
      {useTime && (
        <div className={styles['controls']}>
          <span className={styles['modify']} onClick={() => onTimeModify()}>Уточнить время</span>
          <span className={styles['time']}>{ moment({ hour, minute }).format('HH:mm') }</span>
        </div>
      )}
      <div className={styles['content']}>
        <Days
          date={date}
          year={year}
          month={month}
          minDate={minDate}
          maxDate={maxDate}
          value={moment({ month, year })}
          onChange={handleChangeDay}
        />
      </div>
    </div>
  );
}

export default Dates;
