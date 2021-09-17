
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Content({ children, inProcess }) {
  return (
    <article id="scroller" className={styles['wrapper']}>
      <span className={cn(styles['spinner'], {
        [styles['spinner--process']]: inProcess,
      })} />
      { children }
    </article>
  );
}
