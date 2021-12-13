
import { selectData, selectMeta } from '@modules/client-comments';

import numeral from '@packages/numeral';
import { Header } from '@ui.packages/client-kit';
import { nounDeclension } from '@ui.packages/utils';

import React from 'react';
import { useSelector } from "react-redux";

import Comment from "./Comment";

import styles from "./default.module.scss";


function Comments() {
  const data = useSelector(selectData);
  const meta = useSelector(selectMeta);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header>{ numeral(meta['total']).format() } { nounDeclension(meta['total'], ['комментария', 'комментарий', 'комментариев']) }</Header>
      </div>
      <div className={styles['content']}>
        {data.map((item) => (
          <Comment key={item['uuid']} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
