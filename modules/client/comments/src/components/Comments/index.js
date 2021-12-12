
import { selectData } from '@modules/client-comments';

import { Header } from '@ui.packages/client-kit';

import React from 'react';
import { useSelector } from "react-redux";

import Comment from "./Comment";

import styles from "./default.module.scss";


function Comments() {
  const comments = useSelector(selectData);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header>Комментарии</Header>
      </div>
      <div className={styles['content']}>
        {comments.map((item) => (
          <Comment key={item['uuid']} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
