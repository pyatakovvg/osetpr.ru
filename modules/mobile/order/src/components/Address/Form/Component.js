
import { Button, InputField } from '@ui.packages/mobile-kit';
// import { selectOrder } from '@ui.packages/order';

import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import Item from '../Item';

import styles from './default.module.scss';


function AddressForm({ handleSubmit }) {
  // const dispatch = useDispatch();

  // const order = useSelector(selectOrder);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <InputField label={'Город'} name={'city'} tabIndex={1} autoFocus={true} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Улица'} name={'street'} tabIndex={2} />
        </div>
        <div className={styles['row']}>
          <InputField label={'№ Дома'} name={'home'} tabIndex={3} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Корпус'} name={'home2'} tabIndex={4} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Квартира'} name={'room'} tabIndex={5} />
        </div>
        <div className={styles['row']}>
          <InputField label={'Подъезд'} name={'room2'} tabIndex={6} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button mode={'success'}>Выполнить</Button>
      </div>
    </form>
  );
}

export default AddressForm;
