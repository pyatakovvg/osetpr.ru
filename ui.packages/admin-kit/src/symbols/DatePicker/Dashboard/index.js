
import moment from '@packages/moment';

import types from 'prop-types';
import React, { useState } from 'react';

import Months from "../Months";
import Years from "../Years";
import Days from "../Days";

import cn from "classnames";
import styles from "./default.module.scss";


function Dashboard({ value, minDate, maxDate, onChange }) {
  const current = value ? moment(value) : moment();
  const [year, setYear] = useState(current.year());
  const [month, setMonth] = useState(current.month());
  const [date] = useState(value ? current.date() : null);

  function handleChangeYear(year) {
    setYear(year);
  }

  function handleChangePrevMonth() {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear = prevYear - 1;
    }
    setYear(prevYear);
    setMonth(prevMonth);
  }

  function handleChangeNextMonth() {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = nextYear + 1;
    }
    setYear(nextYear);
    setMonth(nextMonth);
  }

  function handleChangeDate(date) {
    onChange(moment({ date, month, year}));
  }

  const prevClassName = cn(styles['month__prev'], 'fas fa-caret-left');
  const nextClassName = cn(styles['month__next'], 'fas fa-caret-right');

  return (
    <div className={styles['dashboard']}>
      <div className={styles['dashboard__header']}>
        <div className={styles['dashboard__left']} onClick={handleChangePrevMonth}>
          <span className={prevClassName} />
        </div>
        <div className={styles['dashboard__center']}>
          <Months number={month} />
          <Years number={year} onChange={handleChangeYear} />
        </div>
        <div className={styles['dashboard__right']} onClick={handleChangeNextMonth}>
          <span className={nextClassName} />
        </div>
      </div>
      <div className={styles['dashboard__content']}>
        <Days date={date} year={year} month={month} minDate={minDate} maxDate={maxDate} onChange={handleChangeDate} />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  value: types.any,
  minDate: types.any,
  maxDate: types.any,
  onChange: types.func,
};

Dashboard.defaultProps = {
  value: null,
  minDate: null,
  maxDate: null,
};

export default Dashboard;
