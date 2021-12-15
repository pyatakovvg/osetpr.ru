
import { Context  } from "@ui.packages/client-application";

import React, { useContext } from 'react';

import Item from './Item';

import styles from './default.module.scss';


export default function Navigation() {
  const { navigate } = useContext(Context);

  return (
    <nav role="navigation" className={styles['wrapper']}>
      {navigate.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </nav>
  );
}
