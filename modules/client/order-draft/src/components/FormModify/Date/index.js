
import { selectInProcess } from '@ui.packages/order';
import { Header, DatepickerField, Checkbox, Text } from '@ui.packages/client-kit';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function DetailsForm() {
  const inProcess = useSelector(selectInProcess);

  const [isFastly, setFastly] = useState(true);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Время доставки</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <div className={styles['col']}>
            <Checkbox
              value={isFastly}
              disabled={inProcess}
              onChange={setFastly}
            >
              <Text>Как можно быстрее</Text>
            </Checkbox>
          </div>
          <div className={styles['col']}>
            <DatepickerField
              useTime
              name={'dateTo'}
              minDate={new Date()}
              disabled={inProcess || isFastly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsForm;
