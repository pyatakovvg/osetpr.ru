
import { selectInProcess } from '@ui.packages/order';
import { Button, Header, Time, Datepicker } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues, change, submit } from 'redux-form';

import styles from './default.module.scss';


function DetailsForm({ handleSubmit, form }) {
  const dispatch = useDispatch();

  const inProcess = useSelector(selectInProcess);
  const values = useSelector(getFormValues(form));

  function changeDateTo(value) {
    dispatch(change(form, 'dateTo', value));
  }

  async function handleResetTime() {
    await dispatch(change(form, 'dateTo', null));
    dispatch(submit(form));
  }

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Время доставки</Header>
        </div>
        <div className={styles['row']}>
          <Datepicker value={values['dateTo']} onChange={(value) => changeDateTo(value)} />
        </div>
        <div className={styles['row']}>
          <Time value={values['dateTo']} onChange={(value) => changeDateTo(value)} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          type={'button'}
          mode={'primary'}
          disabled={inProcess}
          onClick={() => handleResetTime()}
        >Как можно скорее!</Button>
        <br/>
        <Button
          mode={'success'}
          inProcess={inProcess}
        >Установить</Button>
      </div>
    </form>
  );
}

export default DetailsForm;
