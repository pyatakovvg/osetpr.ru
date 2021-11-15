
import { Add } from '@ui.packages/mobile-kit';
import { openDialog } from '@ui.packages/mobile-dialog';

import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './default.module.scss';


export default function CartButton() {
  const dispatch = useDispatch();

  function handleOrder() {
    dispatch(openDialog('add-comment'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['cart']}>
        <Add
          // inProcess={inProcess}
          onClick={() => handleOrder()}
        />
      </div>
      <span className={styles['background']} />
    </div>
  );
}
