
import { Context } from '@ui.packages/mobile-application';
import { openMenuAction, Widget } from '@ui.packages/menu';

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import styles from './default.module.scss';


export default function Header() {
  const dispatch = useDispatch();
  const { navigate } = useContext(Context);

  function handleClick() {
    dispatch(openMenuAction());
  }

  return (
    <div className={styles['wrapper']}>
      <span className={styles['icon']} onClick={() => handleClick()} />
      <Widget navigate={navigate} />
    </div>
  );
}
