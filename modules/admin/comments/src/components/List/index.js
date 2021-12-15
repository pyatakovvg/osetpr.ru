
import { selectItems } from '@modules/admin-comments';

import React from 'react';
import { useSelector } from 'react-redux';

import Comment from './Comment';

import styles from './default.module.scss';


function CommentList() {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      {items.map((item) => (
        <Comment key={item['uuid']} {...item} />
      ))}
    </div>
  );
}

export default CommentList;
