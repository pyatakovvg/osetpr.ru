
import { Search } from '@ui.packages/admin-kit';

import React, { useState } from 'react';

import styles from './defaults.module.scss';


function Widget() {
  const [value, setValue] = useState('');

  return (
    <div className={styles['widget']}>
      <Search
        value={value}
        onChange={(event) => setValue(event['target']['value'])}
      />
    </div>
  );
}

export default Widget;
