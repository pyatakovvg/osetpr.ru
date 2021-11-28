
import { Header, Text, Logotype } from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Information() {
  return (
    <div className={styles['wrapper']}>
      <Header>Error 404</Header>
      <div className={styles['logotype']}>
        <Logotype type={'circle'} />
      </div>
      <Text>Запрашиваемая страница<br/>не найдена</Text>
    </div>
  );
}
