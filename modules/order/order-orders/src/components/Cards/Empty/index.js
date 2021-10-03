
import { Text } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Empty() {
  return (
    <div className={styles['wrapper']}>
      <Text type={Text.TYPE_BODY}>Нет данных для отображения</Text>
    </div>
  );
}

export default Empty;
