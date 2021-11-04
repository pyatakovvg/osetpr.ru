
import React from 'react';

import styles from './default.module.scss';


function Error() {
  return (
    <div className={styles['wrapper']}>
      <span className={styles['loader']}>
        <div className={styles['container']}>
          <p>Error</p>
        </div>
      </span>
    </div>
  );
}

export default Error;
