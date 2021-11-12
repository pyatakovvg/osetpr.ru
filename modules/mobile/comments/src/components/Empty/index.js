
import { Text } from '@ui.packages/mobile-kit'

import React from 'react';

import styles from './default.module.scss';


function Empty() {
  return (
    <div className={styles['wrapper']}>
      <Text>Нет информации для отображения</Text>
    </div>
  );
}

export default Empty;
