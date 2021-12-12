
import { selectData } from '@modules/client-comments';

import React from 'react';
import { useSelector } from "react-redux";

import Comment from "./Comment";

import styles from "./default.module.scss";


function Comments() {
  const comments = useSelector(selectData);

  return (
    <div className={styles['wrapper']}>
      {comments.map((item) => (
        <Comment key={item['uuid']} {...item} />
      ))}
    </div>
  );
}

export default Comments;
