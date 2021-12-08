
import { selectFilter } from '@modules/client-main';

import { Header, Text, Checkbox } from '@ui.packages/client-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function Groups({ values, onChange }) {
  const filter = useSelector(selectFilter);

  function handleChange(value) {
    let newValues;
    if (!!~ values.indexOf(value)) {
      newValues = values.filter((id) => id !== value);
    }
    else {
      newValues = [value, ...values];
    }
    onChange && onChange(newValues);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>Категория</Header>
      </div>
      <div className={styles['content']}>
        {(filter['categories'] || []).map((item) => (
          <div key={item['uuid']} className={styles['checkbox']}>
            <Checkbox value={ !!~ values.indexOf(item['uuid'])} onChange={() => handleChange(item['uuid'])}>
              <Text>{ item['value'] }</Text>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;
