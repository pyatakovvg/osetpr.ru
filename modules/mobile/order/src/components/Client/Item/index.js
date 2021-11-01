
import React from 'react';

import styles from './default.module.scss';


function Item({ title, value, defaultValue, onClick }) {
  return (
    <div className={styles['wrapper']} onClick={onClick}>
      <div className={styles['content']}>
        <span className={styles['title']}>{ title }</span>
        {value && <span className={styles['value']}>{ value }</span>}
        { ! value && <span className={styles['default']}>{ defaultValue }</span>}
      </div>
      <span className={styles['arrow']} />
    </div>
  );
}

export default Item;
