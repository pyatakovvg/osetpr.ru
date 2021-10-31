
import { Header } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Отзывы</Header>
        </div>
      </div>
    </section>
  );
}

export default Comments;
