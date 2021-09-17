
import types from "prop-types";
import React from "react";

import cn from "classnames";
import styles from "./default.module.scss";


function Years({ number, onChange }) {
  function handlePrevClick() {
    let prevNumber = number - 1;
    onChange(prevNumber);
  }

  function handleNextClick() {
    let nextNumber = number + 1;
    onChange(nextNumber);
  }

  const prevClassName = cn(styles['year__prev'], 'fas fa-caret-left');
  const nextClassName = cn(styles['year__next'], 'fas fa-caret-right');
  return (
    <div className={styles['year']}>
      <span className={prevClassName} onClick={handlePrevClick} />
      <span className={styles['year__value']}>{ number }</span>
      <span className={nextClassName} onClick={handleNextClick} />
    </div>
  );
}

Years.propTypes = {
  number: types.number,
  onChange: types.func,
};

Years.defaultProps = {
  number: new Date().getFullYear(),
};

export default Years;
