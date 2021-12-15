
import { getOrder } from "@ui.packages/order";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './Header';
// import Footer from './Footer';

import styles from './default.module.scss';


export default function NavigateModule({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(window.localStorage.getItem('userUuid')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id={'scroller'} className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header />
      </header>
      <section className={styles['content']}>
        { React.Children.map(children, (child) => child) }
      </section>
      {/*<footer className={styles['footer']}>*/}
      {/*  <Footer />*/}
      {/*</footer>*/}
    </section>
  );
}
