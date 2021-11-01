
import { Header, Button, InputField } from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


function AddressForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Адрес доставки</Header>
        </div>
        <div className={styles['row']}>
          <InputField label={'Город'} name={'city'} tabIndex={1} autoFocus={true} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Улица'} name={'street'} tabIndex={2} />
        </div>
        <div className={styles['row']}>
          <InputField label={'№ Дома'} name={'house'} tabIndex={3} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Корпус'} name={'building'} tabIndex={4} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Квартира'} name={'apartment'} tabIndex={5} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Подъезд'} name={'front'} tabIndex={6} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button mode={'success'}>Выполнить</Button>
      </div>
    </form>
  );
}

export default AddressForm;
