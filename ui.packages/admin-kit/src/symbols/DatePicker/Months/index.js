
import React from "react";
import types from "prop-types";

import styles from "./default.module.scss";


const weeks = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


function Month({ number }) {
  return (
    <div className={styles['month']}>
      <span className={styles['month__value']}>{ weeks[number] }</span>
    </div>
  );
}

Month.propTypes = {
  number: types.number,
};

Month.defaultProps = {
  number: 0,
};

export default Month;
