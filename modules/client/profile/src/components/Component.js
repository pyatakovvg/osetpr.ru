
import { Header } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Профайл</Header>
      </div>
      <div className={styles['content']}>

      </div>
    </section>
  );
}

export default Comments;
