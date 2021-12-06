
import { selectInProcess } from '@ui.packages/order';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';
import Address from "./Address";
import Payment from "./Payment";
import Date from "./Date";
import Details from "./Details";


function FormModify({ handleSubmit }) {
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['line']}>
        <div className={styles['row']}>
          <Address disabled={inProcess} />
        </div>
        <div className={styles['row']}>
          <Payment disabled={inProcess} />
        </div>
      </div>
      <div className={styles['line']}>
        <div className={styles['row']}>
          <Date disabled={inProcess} />
        </div>
        <div className={styles['row']}>
          <Details disabled={inProcess} />
        </div>
      </div>
    </form>
  );
}

export default FormModify;
