
import { Header } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Запрашиваемая страница не найдена</Header>
      </div>
      <div className={styles['content']}>

      </div>
    </section>
  );
}

export default Comments;
