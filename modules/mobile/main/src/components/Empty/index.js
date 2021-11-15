
import { Text} from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


function FilterForm() {
  return (
    <div className={styles['wrapper']}>
      <Text>К сожалению, продукция, по данному запросу не найдена</Text>
    </div>
  );
}

export default FilterForm;
