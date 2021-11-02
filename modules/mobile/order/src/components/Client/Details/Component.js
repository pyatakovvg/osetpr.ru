
import { Button, Header, InputField, InputPhoneField } from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


function DetailsForm({ handleSubmit, valid }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Ваши данные</Header>
        </div>
        <div className={styles['row']}>
          <InputField name={'name'} label={'Представтесь'} require />
        </div>
        <div className={styles['row']}>
          <InputPhoneField name={'phone'} label={'Контактный телефон'} require />
        </div>
        <div className={styles['row']}>
          <InputField name={'description'} label={'Дополнительная информация'} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          disabled={ ! valid}
        >Выполнить</Button>
      </div>
    </form>
  );
}

export default DetailsForm;
