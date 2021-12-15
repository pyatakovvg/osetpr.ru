
import moment from '@packages/moment';

import { Header, Text } from '@ui.packages/client-kit'

import React, { useMemo } from 'react';

import User from './User';
import Admin from './Admin';

import cn from 'classnames';
import styles from './default.module.scss';


function Comment({ className, user, content, isAdmin, createdAt }) {
  const wrapperClassName = useMemo(() => cn(styles['wrapper'], className, {
    [styles['is-admin']]: isAdmin,
  }), [className, isAdmin]);

  return (
    <div className={wrapperClassName}>
      <div className={styles['aside']}>
        {isAdmin ? <Admin /> : <User name={user} />}
      </div>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <div className={styles['date']}>
            <Header level={3}>{ moment(createdAt).format('DD.MM.YYYY в HH:mm') }</Header>
          </div>
        </div>
        <div className={styles['comment']}>
          <Text isHtml>{ content }</Text>
        </div>
      </div>
    </div>
  );
}

function Comments({ comments, ...props }) {
  if (comments && !! comments.length) {
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
