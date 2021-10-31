
import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <p>Comments</p>
      </div>
    </section>
  );
}

export default Comments;
