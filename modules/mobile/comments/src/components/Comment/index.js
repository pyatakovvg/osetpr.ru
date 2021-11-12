
import moment from '@packages/moment';

import { Text } from '@ui.packages/mobile-kit'

import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Comment({ className, user, content, createdAt }) {
  const wrapperClassName = cn(styles['wrapper'], className);
  return (
    <div className={wrapperClassName}>
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
  return <Comment {...props} />;
}

export default Comments;
