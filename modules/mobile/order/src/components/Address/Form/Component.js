
// import { Header, Button, Input } from '@ui.packages/mobile-kit';
// import { selectOrder } from '@ui.packages/order';

import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import Item from './Item';

import styles from './default.module.scss';


function AddressForm({ handleSubmit }) {
  // const dispatch = useDispatch();

  // const order = useSelector(selectOrder);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['row']}>
        <Item title={'Адрес доставки'} value={null} defaultValue={'Не указан'} onClick={() => console.log(4676)}/>
      </div>
      <div className={styles['row']}>
        <Item title={'Способ оплаты'} value={null} defaultValue={'Не указан'} onClick={() => console.log(4676)}/>
      </div>
      <div className={styles['row']}>
        <Item title={'Доставка ко времени'} value={null} defaultValue={'Как можно скорее'} onClick={() => console.log(4676)}/>
      </div>
    </form>
  );
}

export default AddressForm;
