
import { selectData } from '@modules/mobile-comments';

import { Header } from "@ui.packages/mobile-kit";

import React from 'react';
import { useSelector } from 'react-redux';

import Comment from './Comment';

import styles from './default.module.scss';


function Comments() {
  const items = useSelector(selectData);
console.log(items)
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Отзывы</Header>
        </div>
        <div className={styles['comments']}>
          {items.map((item) => (
            <Comment key={item['uuid']} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Comments;
