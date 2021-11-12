
import { selectInProcess } from '@ui.packages/order';
import { Button, Header, InputField, TextareaFieldField } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function PaymentForm({ handleSubmit }) {
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Оставить комментарий</Header>
        </div>
        <div className={styles['row']}>
          <InputField name={'user'} label={'Представтесь'} />
        </div>
        <div className={styles['row']}>
          <TextareaFieldField name={'content'} label={'Комментарий'} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          inProcess={inProcess}
        >Сохранить</Button>
      </div>
    </form>
  );
}

export default PaymentForm;
