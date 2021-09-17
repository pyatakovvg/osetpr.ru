
import React, { Children } from 'react';

import styles from './default.module.scss';


export default function Page({ children, ...props }) {
  return (
    <section className={styles['wrapper']}>
      {Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...props,
        });
      })}
    </section>
  );
}
