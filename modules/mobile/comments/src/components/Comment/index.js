
import moment from '@packages/moment';

import { Text } from '@ui.packages/mobile-kit'

import React from 'react';

import styles from './default.module.scss';


function Comment({ user, content, createdAt }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <div className={styles['user']}>
          <Text>{ user ? user : 'Аноним' }</Text>
        </div>
        <div className={styles['date']}>
          <Text>{ moment(createdAt).format('DD.MM.YYYY') }</Text>
        </div>
      </div>
      <div className={styles['content']}>
        <Text isHtml>{ content }</Text>
      </div>
    </div>
  );
}

export default Comment;
