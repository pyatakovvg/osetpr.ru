
import { selectInProcess } from '@ui.packages/order';
import { Button, Header, Time, Datepicker } from '@ui.packages/mobile-kit';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function DetailsForm({ handleSubmit }) {
  const inProcess = useSelector(selectInProcess);

  const [time, setTime] = useState(null);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Время доставки</Header>
        </div>
        <div className={styles['row']}>
          <Datepicker value={time} onChange={(value) => setTime(value)} />
        </div>
        <div className={styles['row']}>
          <Time value={time} onChange={(value) => setTime(value)} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          inProcess={inProcess}
        >Установить</Button>
      </div>
    </form>
  );
}

export default DetailsForm;
