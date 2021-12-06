
import { Header, InputField, TextareaFieldField } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function AddressForm({ disabled }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Адрес доставки</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <InputField label={'Город'} name={'address.city'} tabIndex={1} require readOnly disabled={disabled} />
          </div>
          <div className={styles['col']}>
            <InputField label={'Улица'} name={'address.street'} tabIndex={2} autoFocus={true} require disabled={disabled} />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <InputField label={'№ Дома'} name={'address.house'} tabIndex={3} require disabled={disabled} />
          </div>
          <div className={styles['col']}>
            <InputField label={'Корпус'} name={'address.building'} tabIndex={4} disabled={disabled} />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <InputField label={'Подъезд'} name={'front'} tabIndex={5} disabled={disabled} />
          </div>
          <div className={styles['col']}>
            <InputField label={'Этаж'} name={'address.floor'} tabIndex={6} disabled={disabled} />
          </div>
          <div className={styles['col']}>
            <InputField label={'Квартира'} name={'apartment'} tabIndex={7} disabled={disabled} />
          </div>
          <div className={styles['col']} />
        </div>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <TextareaFieldField name={'description'} label={'Комментарий'} disabled={disabled} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
