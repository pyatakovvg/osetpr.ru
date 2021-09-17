
import React from 'react';

import styles from './default.module.scss';


export default function Empty({ children }) {
  return (
    <section className={styles['wrapper']}>
      <article className={styles['content']}>
        { children }
      </article>
    </section>
  );
}
