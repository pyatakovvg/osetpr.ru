
import { Header, Text } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Empty() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Header>Нет данных для отображения</Header>
        <Text>Попробуйте сменить настройки фильтра</Text>
      </div>
    </div>
  );
}
