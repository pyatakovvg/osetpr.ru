
import React from 'react';

import Information from './Information';

import styles from './default.module.scss';


function NotFound() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <Information />
        </div>
      </div>
    </section>
  );
}

export default NotFound;
