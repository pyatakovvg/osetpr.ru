
import moment from '@packages/moment';

import { Text } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Comment({ user, createdAt, content }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <div className={styles['user']}>
          <Text type={Text.TYPE_BODY}>{ user }</Text>
        </div>
        <div className={styles['date']}>
          <Text>{ moment(createdAt).format('DD.MM.YYYY') }</Text>
        </div>
      </div>
      <div className={styles['content']}>
        <Text>{ content }</Text>
      </div>
    </div>
  );
}

function Comments({ comments, ...props }) {
  if (comments) {
    return (
      <div className={styles['combine']}>
        <div className={styles['parent']}>
          <Comment {...props} />
        </div>
        <div className={styles['children']}>
          {comments.map((comment) => (
            <Comment key={comment['uuid']} {...comment} />
          ))}
        </div>
      </div>
    );
  }

  return <Comment {...props} />
}

export default Comments;
