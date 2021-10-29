
import { getOrder } from '@ui.packages/order';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Cart from './Cart';
import Header from './Header';

import styles from './default.module.scss';


export default function NavigateModule({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(window.localStorage.getItem('userUuid')));
  }, []);

  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header />
      </header>
      <section className={styles['content']}>
        { children }
      </section>
      { ! /order/.test(location['pathname']) && <Cart />}
    </section>
  );
}
