
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


function Header({ year, month, onPrev, onNext, onChangeMonth, onChangeYear }) {
  function handlePrev(event) {
    event.stopPropagation();

    onPrev();
  }

  function handleNext(event) {
    event.stopPropagation();

    onNext();
  }

  function handleYearModify(event) {
    event.stopPropagation();

    onChangeYear();
  }

  function handleMonthModify(event) {
    event.stopPropagation();

    onChangeMonth();
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['block']}>
        <div className={styles['month']} onClick={handleMonthModify}>{ monthNames[month] }</div>
        <div className={styles['year']} onClick={handleYearModify}>{ year }</div>
      </div>
      <div className={styles['delimiter']}>
        <span className={styles['line']} />
      </div>
      <div className={styles['block']}>
        <div className={styles['button']} onClick={(event) => handlePrev(event)}>
          <span className={cn(styles['icon'], 'fas fa-chevron-down')} />
        </div>
        <div className={styles['button']} onClick={(event) => handleNext(event)}>
          <span className={cn(styles['icon'], 'fas fa-chevron-up')} />
        </div>
      </div>
    </div>
  );
}

export default Header;
