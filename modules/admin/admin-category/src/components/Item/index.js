
import { Text, Actions } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Item({ value, onEdit, onRemove }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Text type={Text.TYPE_BODY}>{ value }</Text>
      </div>
      <div className={styles['controls']}>
        <Actions
          onEdit={onEdit}
          onDelete={onRemove}
        />
      </div>
    </div>
  );
}

export default Item;
