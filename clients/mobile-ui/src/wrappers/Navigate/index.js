
import React from 'react';

import Cart from './Cart';
import Header from './Header';

import styles from './default.module.scss';


export default function NavigateModule({ children }) {
  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header />
      </header>
      <section className={styles['content']}>
        { children }
      </section>
      <Cart />
    </section>
  );
}
