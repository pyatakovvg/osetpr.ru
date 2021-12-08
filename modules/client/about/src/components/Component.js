
import { Header } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Тут будет витрина магазина</Header>
      </div>
    </section>
  );
}

export default Comments;
