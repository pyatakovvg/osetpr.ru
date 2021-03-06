
import { selectInProcess } from '@ui.packages/order';
import { Button, Header, InputField, InputPhoneField } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function DetailsForm({ handleSubmit }) {
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Ваши данные</Header>
        </div>
        <div className={styles['row']}>
          <InputField name={'name'} label={'Представьтесь'} require />
        </div>
        <div className={styles['row']}>
          <InputPhoneField name={'phone'} label={'Контактный телефон'} require />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          inProcess={inProcess}
        >Указать</Button>
      </div>
    </form>
  );
}

export default DetailsForm;
