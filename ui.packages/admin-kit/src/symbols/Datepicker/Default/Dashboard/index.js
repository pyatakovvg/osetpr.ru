
import moment from "moment";
import types from 'prop-types';
import { createPortal } from 'react-dom';
import React, { useEffect, useState, useMemo } from 'react';

import Dates from './Dates';
import Years from './Years';
import Months from './Months';
import Times from './Times';

import styles from './default.module.scss';


function useCreatePortal(parent) {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (element) {
      const rect = parent.getBoundingClientRect();

      element.setAttribute('id', 'datepicker');
      element.style.top = rect['bottom'] + 'px';
      element.style.left = rect['left'] + 'px';

      document.body.append(element);
    }
    return () => {
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  return element;
}


function Options({ parentRef, useTime, value, onChange }) {
  const portal = useCreatePortal(parentRef);

  const dateValue = moment(value || new Date());

  const [isYearEdit, setYearEdit] = useState(false);
  const [isMonthEdit, setMonthEdit] = useState(false);
  const [isTimeEdit, setTimeEdit] = useState(false);

  const [date] = useState(value ? dateValue.date() : null);
  const [month, setMonth] = useState(dateValue.month());
  const [year, setYear] = useState(dateValue.year());
  const [hour, setHour] = useState(value ? dateValue.hour() : 0);
  const [minute, setMinute] = useState(value ? dateValue.minute() : 0);

  function handleOpenYearModify(isOpen) {
    setYearEdit(isOpen);
  }

  function handleOpenMonthModify(isOpen) {
    setMonthEdit(isOpen);
  }

  function handleOpenTimeModify(isOpen) {
    setTimeEdit(isOpen);
  }

  function handleChangeYear(value) {
    setYear(value);
    setYearEdit(false);
  }

  function handleChangeMonth(value) {
    setMonth(value);
    setMonthEdit(false);
  }

  function handleChangeTime(value) {
    setHour(value['hour']);
    setMinute(value['minute']);
    setTimeEdit(false);
  }

  function handlePrevMonth() {
    const prevMonth = month - 1;
    if (prevMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    }
    else {
      setMonth(prevMonth);
    }
  }

  function handleNextMonth() {
    const nextMonth = month + 1;
    if (nextMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    }
    else {
      setMonth(nextMonth);
    }
  }

  function handleChange(date) {
    onChange(moment({ date, month, year, hour, minute }));
  }

  return createPortal((
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Dates
          date={date}
          month={month}
          year={year}
          hour={hour}
          minute={minute}
          useTime={useTime}
          onPrev={() => handlePrevMonth()}
          onNext={() => handleNextMonth()}
          onYearModify={() => handleOpenYearModify(true)}
          onMonthModify={() => handleOpenMonthModify(true)}
          onTimeModify={() => handleOpenTimeModify(true)}
          onChange={(value) => handleChange(value)}
        />
      </div>
      {isYearEdit && (
        <div className={styles['block']}>
          <Years
            year={year}
            onChange={(value) => handleChangeYear(value)}
          />
        </div>
      )}
      {isMonthEdit && (
        <div className={styles['block']}>
          <Months
            month={month}
            onChange={(value) => handleChangeMonth(value)}
          />
        </div>
      )}
      {isTimeEdit && (
        <div className={styles['block']}>
          <Times
            hour={hour}
            minute={minute}
            onChange={(value) => handleChangeTime(value)}
          />
        </div>
      )}
    </div>
  ), portal);
}

Options.propTypes = {
  parentRef: types.object,
  value: types.string,
  onChange: types.func,
};

Options.defaultProps = {
  parentRef: null,
  value: null,
};

export default Options;
