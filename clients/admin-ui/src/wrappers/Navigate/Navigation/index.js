
import { Context  } from "@ui.packages/admin-application";

import React, { useContext } from 'react';

import Item from './Item';

import styles from './default.module.scss';


export default function Navigation() {
  const { navigate } = useContext(Context);

  return (
    <nav role="navigation" className={styles['navigate']}>
      {navigate.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </nav>
  );
}
