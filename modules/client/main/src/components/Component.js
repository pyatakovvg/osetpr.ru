
import React from 'react';

import Aside from './Aside';
import Filter from './Filter';
import Products from './Products';

import styles from './default.module.scss';


function Main() {
  return (
    <section className={styles['wrapper']}>
      <aside className={styles['filter']}>
        <Filter />
      </aside>
      <article className={styles['content']}>
        <Aside />
        <Products />
      </article>
    </section>
  );
}

export default Main;
