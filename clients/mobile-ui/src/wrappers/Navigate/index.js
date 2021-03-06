
import { getOrder } from '@ui.packages/order';
import { Notifications } from '@ui.packages/mobile-notifications';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Add from './Add';
import Cart from './Cart';
import Header from './Header';

import styles from './default.module.scss';


export default function NavigateModule({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(window.localStorage.getItem('userUuid')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header />
      </header>
      <section className={styles['content']}>
        { children }
      </section>
      { ! /order|comments/.test(location['pathname']) && (
        <Cart />
      )}
      {/comments/.test(location['pathname']) && (
        <Add />
      )}
      <Notifications />
    </section>
  );
}
