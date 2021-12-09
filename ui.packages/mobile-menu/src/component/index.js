
import { selectIsOpen, closeMenuAction } from '@ui.packages/menu';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navigate from './Navigate';

import styles from './default.module.scss';


export default function Menu({ navigate }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);

  function handleClose() {
    dispatch(closeMenuAction());
  }

  return isOpen && ReactDOM.createPortal((
    <div className={styles['wrapper']}>
      <div className={styles['menu']}>
        <div className={styles['control']}>
          <div className={styles['close']} onClick={() => handleClose()} />
        </div>
        <div className={styles['content']}>
          <Navigate items={navigate} />
        </div>
      </div>
    </div>
  ), document.querySelector('#menu'));
}
