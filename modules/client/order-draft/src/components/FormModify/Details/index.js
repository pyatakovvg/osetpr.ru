
// import { selectInProcess } from '@ui.packages/order';
import { Header, InputField, InputPhoneField } from '@ui.packages/client-kit';

import React from 'react';
// import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function DetailsForm() {
  // const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Ваши данные</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <InputField name={'customer.name'} label={'Представьтесь'} require />
          </div>
          <div className={styles['col']}>
            <InputPhoneField name={'customer.phone'} label={'Контактный телефон'} require />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsForm;
